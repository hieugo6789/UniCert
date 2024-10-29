import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  ExamDetailFailure,
  ExamDetailsStart,
  ExamDetailSuccess,
} from "../../redux/slice/SimulationExam/examDetailSlice";

import agent from "../../utils/agent";

const useExamDetail = () => {
  const state = useAppSelector((state) => state.examDetail);
  const dispatch = useAppDispatch();
  const getExamDetails = async (id: number) => {
    dispatch(ExamDetailsStart());
    try {
      const response = await agent.SimulationExam.getSimulationExamDetail(id);
      dispatch(ExamDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Exam details:", error);
      dispatch(ExamDetailFailure());
    }
  };
  return { state, getExamDetails };
};
export default useExamDetail;
