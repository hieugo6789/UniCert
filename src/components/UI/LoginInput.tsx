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
    <div className="relative">
      <input
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Nhập  tên đăng nhập"
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
function MyInputFirstName({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  return (
    <div className="relative">
      <input
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Tên họ"
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
    <div className="relative">
      <input
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Số điện thoại"
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
function MyInputLastName({
  field,
  placeholder,
  error,
  helperText,
}: MyInputProps) {
  return (
    <div className="relative">
      <input
        {...field}
        id={field.name}
        value={field.value || ""}
        onChange={field.onChange}
        autoComplete="off"
        placeholder="Tên của bạn"
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
    <div className="relative">
      <input
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
    <div>
      <input
        {...field}
        id={field.name}
        type={showPassword ? "text" : "password"}
        value={field.value || ""}
        onChange={field.onChange}
        placeholder="Nhập mật khẩu    "
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

export {
  MyInput,
  MyInputPassword,
  MyInputFirstName,
  MyInputLastName,
  MyInputEmail,
  MyInputConfirmPassword,
};
