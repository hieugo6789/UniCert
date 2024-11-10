import image from "../../assets/images/login.png";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import {
  MyInput,
  MyInputAddress,
  MyInputDob,
  MyInputEmail,
  MyInputFullName,
  MyInputPassword,
  MyInputPhoneNumber,
} from "../../components/UI/LoginInput";
import { Spin } from "antd";

const Register = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
    fullname: "",
    dob: new Date("2000-01-01"),
    address: "",
    phoneNumber: "",
  };
  const { handleRegister, isLoading } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .min(5, "Email must be at least 5 characters")
      .max(50, "Email cannot exceed 50 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 6 characters")
      .max(20, "Username cannot exceed 20 characters"),
    fullname: Yup.string()
      .required("Fullname is required")
      .min(3, "Fullname must be at least 3 characters")
      .max(20, "Fullname cannot exceed 20 characters"),
    address: Yup.string()
      .required("Address is required")
      .min(3, "Address must be at least 3 characters"),
    dob: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  });
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white p-4">
      <div className="hidden md:flex md:flex-1 justify-center items-center">
        <img
          src={image}
          alt="Image"
          className="w-2/3"
        />
      </div>
      <div className="w-full md:flex-1 max-w-md">
        <div className="w-full p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              <Field
                name="email"
                component={MyInputEmail}
              />
              <Field
                name="password"
                component={MyInputPassword}
              />
              <Field
                name="username"
                component={MyInput}
              />

              <Field
                name="fullname"
                component={MyInputFullName}
              />
              <Field
                name="dob"
                component={MyInputDob}
              />

              <Field
                name="address"
                component={MyInputAddress}
              />
              <Field
                name="phoneNumber"
                component={MyInputPhoneNumber}
              />

              <button
                disabled={isLoading}
                type="submit"
                className="bg-gradient-to-tr w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
              >
                {isLoading ? <Spin /> : "Register"}
              </button>
            </Form>
          </Formik>
          <p className="text-center text-sm text-gray-500 mt-4 bg-gray-100 w-full p-2.5 rounded-xl">
            Already have account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
