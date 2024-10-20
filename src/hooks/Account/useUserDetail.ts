import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UserDetailFailure,
  UserDetailsStart,
  UserDetailSuccess,
} from "../../redux/slice/Account/userDetailSlice";
import agent from "../../utils/agent";

const useUserDetail = () => {
  const state = useAppSelector((state) => state.userDetail);
  const dispatch = useAppDispatch();
  const getUserDetails = async (id: string) => {
    dispatch(UserDetailsStart());
    try {
      const response = await agent.Account.getAccountDetail(id);
      dispatch(UserDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching User details:", error);
      dispatch(UserDetailFailure());
    }
  };
  return { state, getUserDetails };
};
export default useUserDetail;
