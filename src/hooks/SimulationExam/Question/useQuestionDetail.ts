import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  QuestionDetailFailure,
  QuestionDetailsStart,
  QuestionDetailSuccess,
} from "../../../redux/slice/SimulationExam/Question/questionDetailSlice";
import agent from "../../../utils/agent";

const useQuestionDetail = () => {
  const state = useAppSelector((state) => state.questionDetail);
  const dispatch = useAppDispatch();
  const getQuestionDetails = async (id: number) => {
    dispatch(QuestionDetailsStart());
    try {
      const response = await agent.Question.questionDetail(id);
      dispatch(QuestionDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Question details:", error);
      dispatch(QuestionDetailFailure());
    }
  };
  return { state, getQuestionDetails };
};
export default useQuestionDetail;
