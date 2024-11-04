import { createQuestion } from "../../../models/SimulationExam/question";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  createQuestionFailure,
  createQuestionStart,
  createQuestionSuccess,
} from "../../../redux/slice/SimulationExam/Question/createQuestionSlice";
import agent from "../../../utils/agent";

export function useCreateQuestion() {
  const state = useAppSelector((state) => state.createQuestion);
  const dispatch = useAppDispatch();

  const handleCreateQuestion = async (data: createQuestion) => {
    dispatch(createQuestionStart());
    try {
      const response = await agent.Question.createQuestion(data);
      dispatch(createQuestionSuccess(response));
    } catch (error) {
      console.error("Error creating question:", error);
      dispatch(createQuestionFailure());
    }
  };

  return { state, handleCreateQuestion };
}
