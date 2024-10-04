import CustomButton from "../../components/UI/CustomButton";
import image from "../../assets/images/login.png";
import CustomInput from "../../components/UI/CustomInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hook";
import { loginFailure, loginStart } from "../../redux/slice/authSlice";
import baseApi from "../../utils/baseApi";
import { ROLE } from "../../constants/role";
import { LoginInput } from "../../models/authentication";
import { AxiosError } from "axios";
import { LoginError } from "../../utils/authUtils/loginValidation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { MyInputEmail, MyInputPassword } from "../../components/UI/LoginInput";

interface roleJwt extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),
  });
  const dispatch = useAppDispatch();

  const handleLogin = async (value: LoginInput) => {
    setIsLoading(true);
    dispatch(loginStart());
    try {
      const { data } = await baseApi.post(`api/v1/Login`, {
        email: value.email,
        password: value.password,
      });
      // const token = data.accessToken;

      const decodeToken = jwtDecode(data.data.accessToken) as roleJwt;
      // const expirationTime = Math.floor(Date.now() / 1000) + 20 * 60;
      // localStorage.setItem("exp", expirationTime.toString());

      Cookies.set("token", data.data.accessToken, { expires: 1 });
      Cookies.set(
        "role",
        decodeToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        { expires: 1 }
      );
      Cookies.set(
        "userId",
        decodeToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        { expires: 1 }
      );

      switch (
        decodeToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      ) {
        case ROLE.role1:
          navigate(`/admin`);
          break;
        case ROLE.role2:
          navigate(`/admin`);
          break;
        case ROLE.role3:
          navigate(`/admin`);
          break;
        case ROLE.role4:
          navigate(`/`);
          break;
        default:
          break;
      }
      localStorage.setItem("token", data.data.accessToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        if (errorResponse in LoginError) {
          const translatedError =
            LoginError[errorResponse as keyof typeof LoginError];
          dispatch(loginFailure(translatedError));
        } else {
          dispatch(loginFailure(errorResponse));
        }
      } else {
        dispatch(loginFailure("Đã có lỗi xảy ra"));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={image}
          alt="Image"
          className="w-2/3"
        />
      </div>
      <div className="flex-1">
        <div className="max-w-md mx-auto  p-8 ">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
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

              <button
                disabled={isLoading}
                type="submit"
                className="bg-gradient-to-tr w-full py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
              >
                {/* {isLoading ? <Spinner color="default" /> : "Đăng nhập"} */}
                Login
              </button>
            </Form>
          </Formik>

          <p className="text-center text-sm text-gray-500 mt-4">
            Or{" "}
            <a
              href="/login"
              className="text-purple-600 font-bold hover:underline"
            >
              Forgot password?
            </a>
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
