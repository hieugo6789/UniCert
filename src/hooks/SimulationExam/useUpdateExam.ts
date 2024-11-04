import { updateExam } from "../../models/SimulationExam/simulationExam";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailExamFailure,
  UpdateDetailExamStart,
  UpdateDetailExamSuccess,
} from "../../redux/slice/SimulationExam/examDetailSlice";
import agent from "../../utils/agent";

const useUpdateExam = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.examDetail);

  const updateExamDetails = async (examId: number, data: updateExam) => {
    dispatch(UpdateDetailExamStart());
    try {
      const response = await agent.SimulationExam.updateSimulationExam(
        examId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailExamSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailExamFailure(error.message || "Failed to update Exam detail")
      );
    }
  };

  return {
    updateExamDetails,
    state,
  };
};
export default useUpdateExam;
