import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailExamFailure,
  UpdateDetailExamStart,
  UpdateDetailExamSuccess,
} from "../../redux/slice/SimulationExam/examDetailSlice";
import agent from "../../utils/agent";

const usePermissionExam = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.examDetail);

  const updatePermissionExamDetails = async (ExamId: number, data: number) => {
    dispatch(UpdateDetailExamStart());
    try {
      const response = await agent.SimulationExam.updateExamPermission(
        ExamId,
        data
      );
      console.log("Response:", response);
      dispatch(UpdateDetailExamSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailExamFailure(error.message || "Failed to update Exam detail")
      );
    }
  };

  return {
    updatePermissionExamDetails,
    state,
  };
};
export default usePermissionExam;
