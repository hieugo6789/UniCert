import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  deleteQuestionFailure,
  deleteQuestionStart,
  deleteQuestionSuccess,
} from "../../../redux/slice/SimulationExam/Question/deleteQuestionSlice";
import agent from "../../../utils/agent";

const useDeleteQuestion = () => {
  const state = useAppSelector((state) => state.deleteQuestion);
  const dispatch = useAppDispatch();

  const handleDeleteQuestion = async (questionId: number) => {
    dispatch(deleteQuestionStart());
    try {
      const response = await agent.Question.deleteQuestion(questionId);
      dispatch(deleteQuestionSuccess(response.data));
    } catch (error) {
      console.error("Error deleting question:", error);
      dispatch(deleteQuestionFailure());
    }
  };
  return { state, handleDeleteQuestion };
};
export default useDeleteQuestion;
