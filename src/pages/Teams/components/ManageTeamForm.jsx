import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/global/SelectBox";
import { getCities, getGenderOptions, separateGender } from "@/utils/functions";
import InputField from "@/components/global/InputField";
import DatePickerField from "@/components/global/DatePickerField";
import PhoneNumberInput from "@/components/global/PhoneNumberInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { provinces } from "@/constant/provinces";
import { categories } from "@/constant/categories";
import MutlitpleInputField from "@/components/global/MutlitpleInputField";
import toast from "react-hot-toast";
import CheckBoxField from "@/components/global/CheckBoxField";
import { useDispatch, useSelector } from "react-redux";
import { addNewTeam } from "@/redux/teamSlice";
import Spinner from "@/components/global/Spinner";
import ComboboxField from "@/components/global/ComboboxField";
import { useEffect, useState } from "react";
import { getBoxesFromDB } from "@/utils/DBFunctions3";

const formSchema = z
  .object({
    category: z.string().min(1, { message: "Category is required" }),
    captainEmail: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    teamName: z.string().min(1, { message: "Team Name is required" }),
    membersEmails: z.array(z.string().email("Invalid email")),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    dob: z.object({
      startDate: z.date(),
      endDate: z.date(),
    }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .superRefine(isValidPhoneNumber, { message: "Invalid phone number" }),
    country: z.string().min(1, { message: "Country is required" }),
    province: z.string().min(1, { message: "Province is required" }),
    city: z.string().min(1, { message: "City is required" }),
    street: z.string().min(1, { message: "Street is required" }),
    streetNumber: z.string().min(1, { message: "Street Number is required" }),
    boxNumber: z.string().min(1, { message: "Box Number is required" }),
    postalCode: z.string().min(1, { message: "Postal Code is required" }),
    isPaid: z.boolean(),
    otherBoxNumber: z.string().optional(),
  })
  .refine((data) => !data.membersEmails.includes(data.captainEmail), {
    message: "Captain email should not be in members emails",
    path: ["membersEmails"],
  })
  .refine(
    (data) =>
      separateGender(data.category).length - 1 === data.membersEmails.length,
    {
      message: "You should add all members emails",
      path: ["membersEmails"],
    }
  )
  .refine(
    (data) => {
      if (data.boxNumber === "Other" && !data.otherBoxNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Other Box Number is required",
      path: ["otherBoxNumber"],
    }
  );

const initialFormValues = {
  category: "",
  teamName: "",
  membersEmails: [],
  captainEmail: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: {},
  phone: "",
  country: "",
  province: "",
  city: "",
  street: "",
  streetNumber: "",
  boxNumber: "",
  postalCode: "",
  isPaid: false,
  otherBoxNumber: "",
};

const ManageTeamForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialFormValues,
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
      await dispatch(addNewTeam(values)).unwrap();
      toast.success("Team created successfully");
      form.reset({ ...initialFormValues });
    } catch (error) {
      toast.error(newTeamError);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-grow overflow-auto flex flex-col"
        >
          <div className="flex-grow overflow-auto custom-scrollbar scrollbar-hide flex flex-col gap-4 px-4 pb-5">
            <SelectBox
              form={form}
              indicator="category"
              label="Category"
              placeholder={"Select Category"}
              options={categories}
            />

            <InputField
              form={form}
              indicator="teamName"
              label="Team Name"
              placeholder={"Enter Team Name"}
            />

            <InputField
              form={form}
              indicator="firstName"
              label="First Name"
              placeholder={"Enter First Name"}
            />

            <InputField
              form={form}
              indicator="lastName"
              label="Last Name"
              placeholder={"Enter Last Name"}
            />

            <InputField
              form={form}
              indicator="captainEmail"
              label="Captain Email"
              placeholder={"Enter Email"}
            />

            <SelectBox
              form={form}
              indicator="gender"
              label="Gender"
              placeholder={"Select Gender"}
              options={
                form.watch("category")
                  ? getGenderOptions(form.watch("category"))
                  : []
              }
              disabled={!form.watch("category")}
            />

            <DatePickerField
              form={form}
              label={"Date of birth"}
              indicator="dob"
            />

            <PhoneNumberInput
              form={form}
              label={"Phone Number"}
              indicator="phone"
            />

            <InputField
              form={form}
              indicator="country"
              label="Country"
              placeholder={"Enter Country"}
            />

            <SelectBox
              form={form}
              indicator="province"
              label="Province"
              placeholder={"Select Province"}
              options={provinces}
              toSelect="province"
            />

            <SelectBox
              form={form}
              indicator="city"
              label="City"
              placeholder={"Select City"}
              options={
                form.watch("province") ? getCities(form.watch("province")) : []
              }
              disabled={!form.watch("province")}
              toSelect="city"
            />

            <InputField
              form={form}
              indicator="street"
              label="Street"
              placeholder={"Enter Street"}
            />

            <InputField
              form={form}
              indicator="streetNumber"
              label="Street Number"
              placeholder={"Enter Street Number"}
            />

            <ComboboxField
              form={form}
              indicator="boxNumber"
              label="Box Number"
              placeholder={"Enter Box Number"}
              options={boxes}
              disabled={loadingBoxes}
            />

            {form.watch("boxNumber") === "Other" && (
              <InputField
                form={form}
                indicator="otherBoxNumber"
                label="Other Box Number"
                placeholder={"Enter Other Box Number"}
              />
            )}

            <InputField
              form={form}
              indicator="postalCode"
              label="Postal Code"
              placeholder={"Enter Postal Code"}
            />

            <MutlitpleInputField
              form={form}
              indicator="membersEmails"
              label="Team Members Emails"
              placeholder={"Enter Team Members Emails"}
              disabled={
                !form.watch("category") ||
                separateGender(form.watch("category")).length - 1 ===
                  form.watch("membersEmails").length
              }
            />

            <CheckBoxField form={form} indicator="isPaid" label="Fee Paid" />
          </div>
          {creatingNewTeam ? (
            <div className="w-full flex flex-row items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Button
              className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
              type="submit"
            >
              Add Team
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default ManageTeamForm;
