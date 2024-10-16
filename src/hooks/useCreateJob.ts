import { createJobInput } from "../models/jobPosition";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createJobFailure,
  createJobStart,
  createJobSuccess,
} from "../redux/slice/createJobSlice";
import agent from "../utils/agent";

export function useCreateJob() {
  const state = useAppSelector((state) => state.createJob);
  const dispatch = useAppDispatch();

  const handleCreateJob = async (jobData: createJobInput) => {
    dispatch(createJobStart());
    try {
      const response = await agent.JobPosition.createJobPosition(jobData);
      dispatch(createJobSuccess(response));
    } catch (error) {
      console.error("Error creating certification:", error);
      dispatch(createJobFailure());
    }
  };

  return { state, handleCreateJob };
}
