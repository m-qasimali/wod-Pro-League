/* eslint-disable react/prop-types */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const InputField = ({
  form,
  label,
  indicator,
  placeholder,
  disabled = false,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={indicator}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
