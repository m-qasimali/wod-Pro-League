/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/global/SelectBox";
import { getGenderOptions, separateGender } from "@/utils/functions";
import InputField from "@/components/global/InputField";
import { isValidPhoneNumber } from "react-phone-number-input";
import { categories } from "@/constant/categories";
import MutlitpleInputField from "@/components/global/MutlitpleInputField";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/global/Spinner";
import { useEffect, useState } from "react";
import { getBoxesFromDB } from "@/utils/DBFunctions3";

const formSchema = z
  .object({
    teamCategory: z.string().min(1, { message: "Category is required" }),
    creatorEmail: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    teamName: z.string().min(1, { message: "Team Name is required" }),
    teammateEmails: z.array(z.string().email("Invalid email")),
  })
  .refine((data) => !data.teammateEmails.includes(data.creatorEmail), {
    message: "Captain email should not be in members emails",
    path: ["teammateEmails"],
  })
  .refine(
    (data) =>
      separateGender(data.category).length - 1 === data.teammateEmails.length,
    {
      message: "You should add all members emails",
      path: ["teammateEmails"],
    }
  );

const initialFormValues = {
  teamCategory: "",
  teamName: "",
  teammateEmails: [],
  creatorEmail: "",
};

const EditTeamForm = ({ team }) => {
  console.log(team);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialFormValues,
      ...team,
    },
  });
  const dispatch = useDispatch();
  const { creatingNewTeam, newTeamError } = useSelector((state) => state.team);
  const [loadingBoxes, setLoadingBoxes] = useState(false);
  const [boxes, setBoxes] = useState([]);

  const getBoxes = async () => {
    try {
      setLoadingBoxes(true);
      const res = await getBoxesFromDB();
      setBoxes(res);
    } catch (error) {
      toast.error("Error getting boxes");
    } finally {
      setLoadingBoxes(false);
    }
  };

  useEffect(() => {
    getBoxes();
  }, []);

  async function onSubmit(values) {
    try {
      //   await dispatch(addNewTeam(values)).unwrap();
      form.reset({ ...initialFormValues });
    } catch (error) {
      toast.error(newTeamError);
    }
  }

  const isDataUpdated = () => {
    const formEmails = form.watch("teammateEmails");
    return (
      form.watch("teamName") === team.teamName &&
      formEmails.every((email) => team.teammateEmails.includes(email))
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-grow overflow-auto flex flex-col"
        >
          <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4 px-4 pb-5">
            <InputField
              form={form}
              indicator="teamCategory"
              label="Category"
              disabled={true}
            />

            <InputField
              form={form}
              indicator="teamName"
              label="Team Name"
              placeholder={"Enter Team Name"}
            />

            <InputField
              form={form}
              indicator="creatorEmail"
              label="Captain Email"
              placeholder={"Enter Email"}
              disabled={true}
            />

            <MutlitpleInputField
              form={form}
              indicator="teammateEmails"
              label="Team Members Emails"
              placeholder={"Enter Team Members Emails"}
              disabled={
                !form.watch("teamCategory") ||
                separateGender(form.watch("teamCategory")).length - 1 ===
                  form.watch("teammateEmails").length
              }
            />
          </div>
          {creatingNewTeam ? (
            <div className="w-full flex flex-row items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Button
              className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
              type="submit"
              disabled={isDataUpdated()}
            >
              Update Team
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default EditTeamForm;
