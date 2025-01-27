/* eslint-disable react/prop-types */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import SelectField from "./SelectField";

const SelectBox = ({
  form,
  indicator,
  label,
  placeholder,
  options,
  disabled = false,
  toSelect,
}) => {
  return (
    <FormField
      control={form.control}
      name={indicator}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SelectField
              state={field.value}
              handleChange={field.onChange}
              options={options}
              disabled={disabled}
              placeholder={placeholder}
              toSelect={toSelect}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectBox;
