import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentFeedback } from "../../../models/feedback";

export interface FeedbackDetail {
  currentFeedback: currentFeedback;
  currentUpdateDetail: currentFeedback;
  isLoading: boolean;
  error: boolean;
}

const initialState: FeedbackDetail = {
  currentFeedback: {} as currentFeedback,
  currentUpdateDetail: {} as currentFeedback,
  isLoading: false,
  error: false,
};
const FeedbackDetailSlice = createSlice({
  name: "feedbackDetail",
  initialState,
  reducers: {
    FeedbackDetailsStart: (state) => {
      state.isLoading = true;
    },
    FeedbackDetailSuccess: (state, action: PayloadAction<currentFeedback>) => {
      state.isLoading = false;
      state.currentFeedback = action.payload;
      state.error = false;
    },
    FeedbackDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailFeedbackStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailFeedbackSuccess: (
      state,
      action: PayloadAction<currentFeedback>
    ) => {
      state.isLoading = false;
      state.currentFeedback = action.payload;
      state.error = false;
    },
    UpdateDetailFeedbackFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  FeedbackDetailsStart,
  FeedbackDetailSuccess,
  FeedbackDetailFailure,
  UpdateDetailFeedbackStart,
  UpdateDetailFeedbackSuccess,
  UpdateDetailFeedbackFailure,
} = FeedbackDetailSlice.actions;

export default FeedbackDetailSlice.reducer;
