/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/global/SelectBox";
import { getCities, getGenderOptions } from "@/utils/functions";
import InputField from "@/components/global/InputField";
import { provinces, spain_cities } from "@/constant/provinces";
import toast from "react-hot-toast";
import CheckBoxField from "@/components/global/CheckBoxField";
import { updateUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import Spinner from "@/components/global/Spinner";
import { useEffect, useState } from "react";
import { getBoxesFromDB } from "@/utils/DBFunctions3";
import ComboboxField from "@/components/global/ComboboxField";

const formSchema = z.object({
  categoryName: z.string().min(1, { message: "Category is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  gender: z.string().min(1, {
    message: "gender is required",
  }),
  birthDate: z.string(),
  phoneNumber: z.string(),
  country: z.string().min(1, { message: "Country is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  city: z.string().min(1, { message: "City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  number: z.string().min(1, { message: "Street Number is required" }),
  boxNumber: z.string().min(1, { message: "Box Number is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  isPaid: z.boolean(),
  otherBoxNumber: z.string().optional(),
});

const initialFormValues = {
  categoryName: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  phoneNumber: "",
  country: "",
  province: "",
  city: "",
  street: "",
  number: "",
  boxNumber: "",
  postalCode: "",
  isPaid: false,
  otherBoxNumber: "",
};

const EditUserForm = ({ selectedUser }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...selectedUser,
      province: provinces.find(
        (province) => province.nm === selectedUser?.province
      )?.id,
      city: spain_cities.find((city) => city.nm === selectedUser.city)?.id,
    },
  });
  const dispatch = useDispatch();
  const [loadingBoxes, setLoadingBoxes] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [updating, setUpdating] = useState(false);

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
      setUpdating(true);
      const validData = {
        ...values,
        id: selectedUser.id,
        city: spain_cities.find((city) => city.id === values.city).nm,
        province: provinces.find((province) => province.id === values.province)
          .nm,
      };
      await dispatch(updateUser(validData)).unwrap();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      form.reset(initialFormValues);
      setUpdating(false);
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
              indicator="categoryName"
              label="Category"
              placeholder={"Select Category"}
              disabled={true}
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
              disabled={true}
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
              disabled={true}
            />

            <InputField
              form={form}
              label={"Date of birth"}
              indicator="birthDate"
              disabled={true}
            />

            <InputField
              form={form}
              label={"Phone Number"}
              indicator="phoneNumber"
              disabled={true}
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
              indicator="number"
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
            disabled={updating}
          >
            {updating ? <Spinner /> : "Update User"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserForm;
