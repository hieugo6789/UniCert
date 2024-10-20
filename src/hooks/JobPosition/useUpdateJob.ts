import { updateJobInput } from "../../models/jobPosition";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailJobFailure,
  UpdateDetailJobStart,
  UpdateDetailJobSuccess,
} from "../../redux/slice/JobPosition/jobDetailSlice";
import agent from "../../utils/agent";

const useUpdateJob = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.jobDetail);

  const updateJobDetails = async (jobId: string, data: updateJobInput) => {
    dispatch(UpdateDetailJobStart());
    try {
      const response = await agent.JobPosition.updateJobDetail(jobId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailJobSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailJobFailure(error.message || "Failed to update job detail")
      );
    }
  };

  return {
    updateJobDetails,
    state,
  };
};
export default useUpdateJob;
