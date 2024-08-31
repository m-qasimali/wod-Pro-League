import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/global/SelectBox";
import { getCities, getGenderOptions2 } from "@/utils/functions";
import InputField from "@/components/global/InputField";
import DatePickerField from "@/components/global/DatePickerField";
import PhoneNumberInput from "@/components/global/PhoneNumberInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { provinces } from "@/constant/provinces";
import { getTeamDetailsByEmailFromDB } from "@/utils/DBFunctions2";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMember } from "@/redux/teamSlice";
import Spinner from "@/components/global/Spinner";

const formSchema = z.object({
  captainEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  category: z.string().min(1, { message: "Category is required" }),
  teamName: z.string().min(1, { message: "Team Name is required" }),
  memberEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
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
});

const initialFormValues = {
  captainEmail: "",
  category: "",
  teamName: "",
  memberEmail: "",
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
};

const JoinTeamMemberForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialFormValues,
    },
  });
  const [teamDetails, setTeamDetails] = useState(null);
  const dispatch = useDispatch();
  const [loadingTeam, setLoadingTeam] = useState(false);
  const { creatingNewTeamMember, newTeamMemberError } = useSelector(
    (state) => state.team
  );

  const getTeamDetails = async () => {
    const team = await getTeamDetailsByEmailFromDB({
      creatorEmail: form.watch("captainEmail"),
    });

    if (team) {
      setTeamDetails(team);
      form.setValue("category", team.teamCategory ? team?.teamCategory : "");
      form.setValue("teamName", team.teamName ? team.teamName : "");
    } else {
      form.setValue("category", "");
      form.setValue("teamName", "");
      toast.error("No team found with the given email");
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && form.watch("captainEmail")) {
      e.preventDefault();
      try {
        setLoadingTeam(true);
        await getTeamDetails();
      } catch (error) {
        toast.error("No team found with the given email");
      } finally {
        setLoadingTeam(false);
      }
    }
  };

  async function onSubmit(values) {
    try {
      await dispatch(
        addNewMember({
          ...values,
          teamId: teamDetails?.teamId,
          teammateEmails: teamDetails?.teammateEmails,
        })
      ).unwrap();
      toast.success("Team member added successfully");
      form.reset({ ...initialFormValues });
    } catch (error) {
      toast.error(newTeamMemberError);
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
            <InputField
              form={form}
              indicator="captainEmail"
              label="Captain Email"
              placeholder={"Enter Email"}
              onKeyPress={handleKeyPress}
            />

            {loadingTeam && (
              <div className="w-full flex flex-row items-center justify-center">
                <Spinner />
              </div>
            )}

            {form.getValues("category") !== "" &&
              form.getValues("teamName") !== "" && (
                <>
                  <InputField
                    form={form}
                    indicator="category"
                    label="Category"
                    placeholder={"Team Category"}
                    disabled={true}
                  />

                  <InputField
                    form={form}
                    indicator="teamName"
                    label="Team Name"
                    placeholder={"Enter Team Name"}
                    disabled={true}
                  />

                  <SelectBox
                    form={form}
                    indicator="memberEmail"
                    label="Member Email"
                    placeholder={"Select Member Email"}
                    options={
                      teamDetails.registeredTeamMembers
                        ? teamDetails.teammateEmails.filter(
                            (email) =>
                              !teamDetails.registeredTeamMembers.includes(email)
                          )
                        : []
                    }
                    disabled={!form.watch("category")}
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

                  <SelectBox
                    form={form}
                    indicator="gender"
                    label="Gender"
                    placeholder={"Select Gender"}
                    options={
                      form.watch("category")
                        ? getGenderOptions2(
                            form.watch("category"),
                            teamDetails.teammateGenders
                          )
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
                  />

                  <SelectBox
                    form={form}
                    indicator="city"
                    label="City"
                    placeholder={"Select City"}
                    options={
                      form.watch("province")
                        ? getCities(form.watch("province"))
                        : []
                    }
                    disabled={!form.watch("province")}
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

                  <InputField
                    form={form}
                    indicator="boxNumber"
                    label="Box Number"
                    placeholder={"Enter Box Number"}
                  />

                  <InputField
                    form={form}
                    indicator="postalCode"
                    label="Postal Code"
                    placeholder={"Enter Postal Code"}
                  />
                </>
              )}
          </div>

          {form.getValues("category") !== "" &&
            form.getValues("teamName") !== "" && (
              <Button
                className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
                type="submit"
              >
                {creatingNewTeamMember ? <Spinner /> : "Add Team Member"}
              </Button>
            )}
        </form>
      </Form>
    </>
  );
};

export default JoinTeamMemberForm;
