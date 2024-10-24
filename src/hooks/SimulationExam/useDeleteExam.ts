import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteExamFailure,
  deleteExamStart,
  deleteExamSuccess,
} from "../../redux/slice/SimulationExam/deleteExamSlice";

import agent from "../../utils/agent";

const useDeleteExam = () => {
  const state = useAppSelector((state) => state.deleteExam);
  const dispatch = useAppDispatch();

  const handleDeleteExam = async (examId: number) => {
    dispatch(deleteExamStart());
    try {
      const response = await agent.SimulationExam.deleteSimulationExam(examId);
      dispatch(deleteExamSuccess(response.data));
    } catch (error) {
      console.error("Error deleting exam:", error);
      dispatch(deleteExamFailure());
    }
  };
  return { state, handleDeleteExam };
};
export default useDeleteExam;
