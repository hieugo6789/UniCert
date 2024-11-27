import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  JobDetailFailure,
  JobDetailsStart,
  JobDetailSuccess,
} from "../../redux/slice/JobPosition/jobDetailSlice";
import agent from "../../utils/agent";

const useJobDetail = () => {
  const state = useAppSelector((state) => state.jobDetail);
  const dispatch = useAppDispatch();
  const getJobDetails = async (id: string | undefined) => {
    dispatch(JobDetailsStart());
    try {
      const response = await agent.JobPosition.getJobDetail(id);
      dispatch(JobDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Job details:", error);
      dispatch(JobDetailFailure());
    }
  };
  const jobDetailByOrganize = async (jobId: number, organizeId?: number) => {
    dispatch(JobDetailsStart());
    try {
      const response = await agent.JobPosition.getJobFilterByOrganization(
        jobId,
        organizeId
      );
      dispatch(JobDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Job details:", error);
      dispatch(JobDetailFailure());
    }
  };
  return { state, getJobDetails, jobDetailByOrganize };
};
export default useJobDetail;
