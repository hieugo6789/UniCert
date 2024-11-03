import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  deleteFeedbackFailure,
  deleteFeedbackStart,
  deleteFeedbackSuccess,
} from "../../redux/slice/Feedback/deleteFeedbackSlice";

import agent from "../../utils/agent";

const useDeleteFeedback = () => {
  const state = useAppSelector((state) => state.deleteFeedback);
  const dispatch = useAppDispatch();

  const handleDeleteFeedback = async (feedbackId: number) => {
    dispatch(deleteFeedbackStart());
    try {
      const response = await agent.FeedBack.deleteFeedback(feedbackId);
      dispatch(deleteFeedbackSuccess(response.data));
    } catch (error) {
      console.error("Error deleting feedback:", error);
      dispatch(deleteFeedbackFailure());
    }
  };
  return { state, handleDeleteFeedback };
};
export default useDeleteFeedback;
