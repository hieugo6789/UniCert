import { createFeedback } from "../../models/feedback";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createFeedbackFailure,
  createFeedbackStart,
  createFeedbackSuccess,
} from "../../redux/slice/Feedback/createFeedbackSlice";
import agent from "../../utils/agent";

export function useCreateFeedback() {
  const state = useAppSelector((state) => state.createFeedback);
  const dispatch = useAppDispatch();

  const handleCreateFeedback = async (input: createFeedback) => {
    dispatch(createFeedbackStart());
    try {
      const response = await agent.FeedBack.createFeedback(input);
      dispatch(createFeedbackSuccess(response));
    } catch (error) {
      console.error("Error creating feedback:", error);
      dispatch(createFeedbackFailure());
    }
  };

  return { state, handleCreateFeedback };
}
