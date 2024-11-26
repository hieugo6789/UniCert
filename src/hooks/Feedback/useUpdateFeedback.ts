import { updateFeedback } from "../../models/feedback";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  UpdateDetailFeedbackFailure,
  UpdateDetailFeedbackStart,
  UpdateDetailFeedbackSuccess,
} from "../../redux/slice/Feedback/feedbackDetailSlice";
import agent from "../../utils/agent";

const useUpdateFeedback = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.feedbackDetail);

  const updateFeedbackDetails = async (Id: number, data: updateFeedback) => {
    dispatch(UpdateDetailFeedbackStart());
    try {
      const response = await agent.FeedBack.updateFeedback(Id, data);
      console.log("Response:", response);
      dispatch(UpdateDetailFeedbackSuccess(response.data));
      return response;
    } catch (error: any) {
      console.error("Update error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      dispatch(
        UpdateDetailFeedbackFailure(
          error.message || "Failed to update feedback detail"
        )
      );
      return null;
    }
  };

  return {
    updateFeedbackDetails,
    state,
  };
};
export default useUpdateFeedback;
