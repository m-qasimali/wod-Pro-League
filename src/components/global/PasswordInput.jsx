/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icons } from "./icons";

const PasswordInput = ({ state, handleChange, loading = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={state}
          onChange={handleChange}
          name="password"
          disabled={loading}
          className="w-full border border-black border-opacity-10 rounded-md p-2 outline-none focus-within:border-primary"
          required
          placeholder="Password"
        />
        <span
          onClick={toggleShowPassword}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          {showPassword ? (
            <Icons.Hide className="w-5 h-5" />
          ) : (
            <Icons.View className="w-5 h-5" />
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
