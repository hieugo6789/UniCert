import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  FeedbackDetailFailure,
  FeedbackDetailsStart,
  FeedbackDetailSuccess,
} from "../../redux/slice/Feedback/feedbackDetailSlice";
import agent from "../../utils/agent";

const useFeedbackDetail = () => {
  const state = useAppSelector((state) => state.feedbackDetail);
  const dispatch = useAppDispatch();
  const getFeedbackDetails = async (id: number) => {
    dispatch(FeedbackDetailsStart());
    try {
      const response = await agent.FeedBack.getFeedbackDetail(id);
      dispatch(FeedbackDetailSuccess(response.data));
    } catch (error) {
      console.error("Error fetching Feedback details:", error);
      dispatch(FeedbackDetailFailure());
    }
  };
  return { state, getFeedbackDetails };
};
export default useFeedbackDetail;
