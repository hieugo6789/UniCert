import { useNavigate } from "react-router-dom";
import baseApi from "../utils/baseApi";
import Cookies from "js-cookie";
import { UserDetail } from "../models/user";
const useProfile = () => {
    const getUserDetail = async () => {
      const userId = Cookies.get("userId");
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const { data } = await baseApi.get(`/api/v1/profile/${userId}`);
      return {
        data,
      };
    };
    const updateProfile = async (data: UserDetail) => {
        const userId = Cookies.get("userId");
        const token = Cookies.get("token");
        if (!token) {
            return;
        }
        const response = await baseApi.put(`/api/v1/profile/${userId}`, data);
        return response;
    }

    return { getUserDetail, updateProfile };
  };
  
  export default useProfile;
