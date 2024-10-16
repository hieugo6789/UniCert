import { UpdateMajor } from "../models/major";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  UpdateDetailMajorFailure,
  UpdateDetailMajorStart,
  UpdateDetailMajorSuccess,
} from "../redux/slice/majorDetailSlice";
import agent from "../utils/agent";

const useUpdateMajor = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.majorDetail);

  const updateMajorDetails = async (majorId: string, data: UpdateMajor) => {
    dispatch(UpdateDetailMajorStart());
    try {
      const response = await agent.Major.updateMajor(majorId, data);
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
    updateMajorDetails,
    state,
  };
};
export default useUpdateMajor;
