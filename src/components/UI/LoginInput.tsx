import React from "react";
import { ErrorMessage } from "formik";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
//de tam vi ch fix dc

export interface MyInputProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  placeholder: string;
  error?: string;
  helperText?: string;
}

function MyInput({ field, placeholder, error, helperText }: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Username"
        required
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputFullName({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Fullname"
        required
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputPhoneNumber({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Phone number"
        required
      />
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputEmail({ field, placeholder, error, helperText }: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Email"
        required
      />

      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputAddress({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Address"
        required
      />

      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputDob({ field, placeholder, error, helperText }: MyInputProps) {
  return (
    <div className="mb-2">
      <input
        className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...field}
        id={field.name}
        type="date"
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder={placeholder || "Date of Birth"}
        required
      />

      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputConfirmPassword({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <input
        {...field}
        id={field.name}
        type={showPassword ? "text" : "password"}
        value={field.value || ""}
        onChange={field.onChange}
        placeholder="Xác nhận mật khẩu"
        autoComplete="off"
        required
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? <VscEyeClosed /> : <VscEye />}
      </span>
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}
function MyInputPassword({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-2">
      <div className="relative">
        <input
          className="w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
          {...field}
          id={field.name}
          type={showPassword ? "text" : "password"}
          value={field.value || ""}
          onChange={field.onChange}
          placeholder="Password"
          autoComplete="off"
          required
        />
        <span
          className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? <VscEyeClosed /> : <VscEye />}
        </span>
      </div>
      <ErrorMessage
        name={field.name}
        component="p"
        className="pt-2 text-sm text-red-500"
      />
    </div>
  );
}

export {
  MyInput,
  MyInputPassword,
  MyInputFullName,
  MyInputEmail,
  MyInputConfirmPassword,
  MyInputPhoneNumber,
  MyInputAddress,
  MyInputDob,
};
