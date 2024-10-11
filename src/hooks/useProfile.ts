// import { useNavigate } from "react-router-dom";
import baseApi from "../utils/baseApi";
import Cookies from "js-cookie";
import { UserDetail } from "../models/user";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  UserDetailFailure,
  UserDetailsStart,
  UserDetailSuccess,
} from "../redux/slice/profileSlice";
import agent from "../utils/agent";
const useProfile = () => {
  const updateProfile = async (data: UserDetail) => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    const response = await baseApi.put(`/api/v1/profile/${userId}`, data);
    return response;
  };

  const state = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const getProfileDetails = async (id: string | undefined) => {
    dispatch(UserDetailsStart());
    try {
      const response = await agent.Profile.getProfile(id);
      dispatch(UserDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching User details:", error);
      dispatch(UserDetailFailure());
    }
  };
  return { state, getProfileDetails, updateProfile };
};

export default useProfile;
