/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

const MutlitpleInputField = ({
  form,
  indicator,
  placeholder,
  disabled = false,
}) => {
  const [state, setState] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter" && state.trim()) {
      e.preventDefault();
      form.setValue(indicator, [...form.getValues(indicator), state.trim()]);
      setState("");
    }
  };

  const handleDelete = (index) => {
    const updatedValues = form
      .getValues(indicator)
      .filter((_, i) => i !== index);
    form.setValue(indicator, updatedValues);
  };

  return (
    <FormField
      control={form.control}
      name={indicator}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel className="text-left">Members Emails</FormLabel>
          <FormControl className="w-full">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-row gap-2 flex-nowrap overflow-auto scrollbar-hide">
                {field.value.map((val, index) => (
                  <Badge
                    key={index}
                    className="flex items-center bg-primary hover:bg-primary text-white rounded-full text-sm px-2 py-1"
                  >
                    <span>{val}</span>
                    <button
                      type="button"
                      className="ml-2 text-white hover:text-red-500"
                      onClick={() => handleDelete(index)}
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>

              <input
                type="text"
                className={
                  "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                }
                value={state}
                onChange={(e) => setState(e.target.value)}
                onKeyDown={handleEnter}
                placeholder={placeholder}
                disabled={disabled}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MutlitpleInputField;
