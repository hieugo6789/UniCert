import { updateQuestion } from "../../../models/SimulationExam/question";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  UpdateDetailQuestionFailure,
  UpdateDetailQuestionStart,
  UpdateDetailQuestionSuccess,
} from "../../../redux/slice/SimulationExam/Question/questionDetailSlice";
import agent from "../../../utils/agent";

const useUpdateQuestion = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.questionDetail);

  const updateQuestionDetails = async (
    questionId: number,
    data: updateQuestion
  ) => {
    dispatch(UpdateDetailQuestionStart());
    try {
      const response = await agent.Question.updateQuestion(questionId, data);
      console.log("Response:", response);
      dispatch(UpdateDetailQuestionSuccess(response.data));
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        // Log the response data for more details
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailQuestionFailure(
          error.message || "Failed to update question detail"
        )
      );
    }
  };

  return {
    updateQuestionDetails,
    state,
  };
};
export default useUpdateQuestion;
