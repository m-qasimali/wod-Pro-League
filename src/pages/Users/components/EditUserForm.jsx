/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/global/SelectBox";
import { getCities, getGenderOptions } from "@/utils/functions";
import InputField from "@/components/global/InputField";
import DatePickerField from "@/components/global/DatePickerField";
import PhoneNumberInput from "@/components/global/PhoneNumberInput";
import { isValidPhoneNumber } from "react-phone-number-input";
import { provinces, spain_cities } from "@/constant/provinces";
import { singlePersonCategories } from "@/constant/categories";
import toast from "react-hot-toast";
import CheckBoxField from "@/components/global/CheckBoxField";
import { createUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/global/Spinner";

const formSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  gender: z.string().min(1, {
    message: "gender is required",
  }),
  dob: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  country: z.string().min(1, { message: "Country is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  streetNumber: z.string().min(1, { message: "Street Number is required" }),
  boxNumber: z.string().min(1, { message: "Box Number is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  isPaid: z.boolean(),
});

const initialFormValues = {
  category: "",
  email: "",
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
};

const EditUserForm = ({ selectedUser }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedUser,
      province: provinces.find(
        (province) => province.nm === selectedUser?.province
      ).id,
      city: spain_cities.find((city) => city.nm === selectedUser.city).id,
    },
  });
  const dispatch = useDispatch();
  const { creatingUser, creatingUserError } = useSelector(
    (state) => state.user
  );

  async function onSubmit(values) {
    try {
      await dispatch(createUser(values)).unwrap();
      toast.success("User created successfully");
    } catch (error) {
      toast.error(creatingUserError);
    } finally {
      form.reset(initialFormValues);
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
              options={singlePersonCategories}
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
              indicator="email"
              label="Email"
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
                form.watch("province")
                  ? getCities(form.watch("province")?.id)
                  : []
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

            <CheckBoxField form={form} indicator="isPaid" label="Fee Paid" />
          </div>
          <Button
            className="bg-primary hover:drop-shadow-md text-white rounded-md p-2 mt-5 flex flex-row items-center justify-center"
            type="submit"
            disabled={creatingUser}
          >
            {creatingUser ? <Spinner /> : "Create User"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserForm;