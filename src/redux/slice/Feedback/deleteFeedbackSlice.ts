import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteFeedback } from "../../../models/feedback";

interface DeleteFeedbackState {
  feedback: deleteFeedback;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteFeedbackState = {
  feedback: {} as deleteFeedback,
  isDeleting: false,
  deleteError: false,
};

const feedbackDeleteState = createSlice({
  name: "feedbackDelete",
  initialState,
  reducers: {
    deleteFeedbackStart: (state) => {
      state.isDeleting = true;
    },
    deleteFeedbackSuccess: (state, action: PayloadAction<deleteFeedback>) => {
      state.isDeleting = false;
      state.feedback = action.payload;
      state.deleteError = false;
    },
    deleteFeedbackFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteFeedbackStart,
  deleteFeedbackSuccess,
  deleteFeedbackFailure,
} = feedbackDeleteState.actions;

export default feedbackDeleteState.reducer;
