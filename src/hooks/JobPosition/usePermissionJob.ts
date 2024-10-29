import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailJobFailure,
  UpdateDetailJobStart,
  UpdateDetailJobSuccess,
} from "../../redux/slice/JobPosition/jobDetailSlice";
import agent from "../../utils/agent";

const usePermissionJob = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.jobDetail);

  const updatePermissionJobDetails = async (jobId: number, data: number) => {
    dispatch(UpdateDetailJobStart());
    try {
      const response = await agent.JobPosition.updateJobPermission(jobId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailJobSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailJobFailure(error.message || "Failed to update job detail")
      );
    }
  };

  return {
    updatePermissionJobDetails,
    state,
  };
};
export default usePermissionJob;
