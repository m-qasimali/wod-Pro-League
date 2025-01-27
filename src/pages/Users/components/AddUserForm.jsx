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
import { useEffect, useState } from "react";
import { getBoxesFromDB } from "@/utils/DBFunctions3";
import ComboboxField from "@/components/global/ComboboxField";
import LocationField from "@/components/global/LocationField";

const formSchema = z
  .object({
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
    location: z.object({
      country: z.string(),
      province: z.string(),
      city: z.string(),
    }),
    isOutOfSpain: z.boolean(),
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
    otherBoxNumber: z.string().optional(),
  })
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
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: {},
  phone: "",
  country: "",
  location: {
    country: "",
    province: "",
    city: "",
  },
  isOutOfSpain: false,
  province: "",
  city: "",
  street: "",
  streetNumber: "",
  boxNumber: "",
  postalCode: "",
  isPaid: false,
  otherBoxNumber: "",
};

const AddUserForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialFormValues,
    },
  });
  const dispatch = useDispatch();
  const { creatingUser, creatingUserError } = useSelector(
    (state) => state.user
  );
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

  useEffect(() => {
    const location = form.watch("location");
    if (location?.country) {
      form.setValue(
        "country",
        location.country || (form.watch("isOutOfSpain") ? "" : "Spain")
      );
      form.setValue("province", location.province || "");
      form.setValue("city", location.city || "");
    }
  }, [form.watch("location")]);

  useEffect(() => {
    if (!form.watch("isOutOfSpain")) {
      form.setValue("country", "Spain");
    } else {
      form.setValue("country", "");
      form.setValue("province", "");
      form.setValue("city", "");
    }
  }, [form.watch("isOutOfSpain")]);

  async function onSubmit(values) {
    try {
      const validData = {
        ...values,
        province: values?.isOutOfSpain
          ? values?.province
          : provinces.find((province) => province.id === values.province).nm,
        city: values?.isOutOfSpain
          ? values?.city
          : spain_cities.find((city) => city.id === values.city).nm,
      };

      await dispatch(createUser(validData)).unwrap();
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

            <CheckBoxField
              form={form}
              indicator="isOutOfSpain"
              label="Out of Spain"
            />

            {form.watch("isOutOfSpain") && (
              <LocationField
                form={form}
                label="Location"
                indicator="location"
              />
            )}

            <InputField
              form={form}
              indicator="country"
              label="Country"
              placeholder={"Enter Country"}
              disabled={true}
            />

            {form.watch("isOutOfSpain") ? (
              <>
                <InputField
                  form={form}
                  indicator="province"
                  label="Province"
                  placeholder={"Select Province"}
                  disabled={true}
                />

                <InputField
                  form={form}
                  indicator="city"
                  label="City"
                  placeholder={"Select City"}
                  disabled={true}
                />
              </>
            ) : (
              <>
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
                      ? getCities(form.watch("province"))
                      : []
                  }
                  disabled={!form.watch("province")}
                  toSelect="city"
                />
              </>
            )}

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

export default AddUserForm;
