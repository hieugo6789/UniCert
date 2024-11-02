import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentFeedback } from "../../../models/feedback";

interface FeedbackState {
  feedbacks: currentFeedback[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: null,
};
export const fetchAllFeedback = createAsyncThunk(
  "admin/fetchAllFeedback",
  async (examId: number) => {
    try {
      const response = await agent.FeedBack.getFeedbackByExamId(examId);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeedback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch feedback .";
      });
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;
