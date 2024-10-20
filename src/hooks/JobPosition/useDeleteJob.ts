import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteJobFailure,
  deleteJobStart,
  deleteJobSuccess,
} from "../../redux/slice/deleteJobSlice";

import agent from "../../utils/agent";

const useDeleteJob = () => {
  const state = useAppSelector((state) => state.jobDelete);
  const dispatch = useAppDispatch();

  const handleDeleteJob = async (jobPositionId: string) => {
    dispatch(deleteJobStart());
    try {
      const response = await agent.JobPosition.deleteJob(jobPositionId);
      dispatch(deleteJobSuccess(response.data));
    } catch (error) {
      console.error("Error deleting certification:", error);
      dispatch(deleteJobFailure());
    }
  };
  return { state, handleDeleteJob };
};
export default useDeleteJob;
