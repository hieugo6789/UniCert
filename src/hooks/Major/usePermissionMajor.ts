import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailMajorFailure,
  UpdateDetailMajorStart,
  UpdateDetailMajorSuccess,
} from "../../redux/slice/Major/majorDetailSlice";
import agent from "../../utils/agent";

const usePermissionMajor = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.majorDetail);

  const updatePermissionMajorDetails = async (
    majorId: number,
    data: number
  ) => {
    dispatch(UpdateDetailMajorStart());
    try {
      const response = await agent.Major.updateMajorPermission(majorId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailMajorSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailMajorFailure(
          error.message || "Failed to update major detail"
        )
      );
    }
  };

  return {
    updatePermissionMajorDetails,
    state,
  };
};
export default usePermissionMajor;
