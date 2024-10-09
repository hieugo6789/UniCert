import { UpdateRole } from "../models/user";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  UpdateDetailFailure,
  UpdateDetailStart,
  UpdateDetailSuccess,
} from "../redux/slice/userDetailSlice";

import agent from "../utils/agent";

const useUpdateUserDetail = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.userDetail);

  const updateUserDetails = async (userId: string, data: UpdateRole) => {
    dispatch(UpdateDetailStart());
    try {
      const response = await agent.Account.updateAccountInformation(
        data,
        userId
      );
      console.log("Response:", response);
      dispatch(UpdateDetailSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailFailure(error.message || "Failed to update user details")
      );
    }
  };

  return {
    updateUserDetails,
    state,
  };
};
export default useUpdateUserDetail;
