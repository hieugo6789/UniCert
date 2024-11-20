import image from "../../assets/images/login.png";
import useAuth from "../../hooks/useAuth";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import { MyInputEmail, MyInputPassword } from "../../components/UI/LoginInput";
import { useAppSelector } from "../../redux/hook";
import { RootState } from "../../redux/store";
// import GoogleLogin from "../../components/LoginGoogle/GoogleLogin";
// import GoogleLoginComponent from "../../components/LoginGoogle/GoogleLogin";

const Login = () => {
  const errorMessage = useAppSelector(
    (state: RootState) => state.auth.displayError
  );
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .min(5, "Email must be at least 5 characters")
      .max(50, "Email cannot exceed 50 characters"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
  });
  const { handleLogin, isLoading } = useAuth();
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Login
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <Field
                name="email"
                component={MyInputEmail}
              />

              <Field
                name="password"
                component={MyInputPassword}
                placeholder="Password"
              />
              {errorMessage && (
                <div className="error-message text-red-500 text-center">
                  {errorMessage}
                </div>
              )}

              <button
                disabled={isLoading}
                type="submit"
                className="bg-gradient-to-tr w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
              >
                {isLoading ? <Spin /> : "Login"}
              </button>
            </Form>
          </Formik>
          {/* <GoogleLoginComponent /> */}
          {/* <GoogleLogin /> */}

          <p className="text-center text-sm text-gray-500 mt-4">
            Or{" "}
            <Link
              to="/reset-password"
              className="text-purple-600 font-bold hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <div className="mt-4 flex-1 h-0.5 bg-gray-300"></div>

          <p className="text-center text-sm text-gray-500 mt-4 bg-gray-100 w-full p-2.5 rounded-xl">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
