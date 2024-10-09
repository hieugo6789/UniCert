import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { LoginInput, RegisterInput } from "../models/authentication";
import {
  loginFailure,
  loginStart,
  registerFailure,
  registerStart,
} from "../redux/slice/authSlice";
import baseApi from "../utils/baseApi";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import { ROLE } from "../constants/role";
import { AxiosError } from "axios";

interface roleJwt extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
}
const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
          navigate(`/admin/dashboard`);
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
        const errorMessage =
          error.response?.data.message || "An error occurred";

        if (error.response?.status === 500) {
          dispatch(loginFailure("Check your email and password."));
        } else {
          dispatch(loginFailure(errorMessage));
        }
      } else {
        dispatch(loginFailure("An unexpected error occurred."));
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async (value: RegisterInput) => {
    setIsLoading(true);
    dispatch(registerStart());
    try {
      const { data } = await baseApi.post(`api/v1/Register`, {
        username: value.username,
        password: value.password,
        email: value.email,
        fullname: value.fullname,
        dob: value.dob,
        address: value.address,
        phoneNumber: value.phoneNumber,
      });
      navigate("/login");
    } catch (error) {
      // Handle errors and dispatch the correct message to Redux state
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error?.message || "An error occurred";

        if (error.response?.status === 500) {
          // If backend returns 500, show a generic error message
          dispatch(registerFailure("Check your email and username."));
        } else {
          // Handle other status codes or messages
          dispatch(registerFailure(errorMessage));
        }
      } else {
        dispatch(registerFailure("An unexpected error occurred."));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { handleLogin, isLoading, handleRegister };
};
export default useAuth;
