import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { peerReviewByExamId } from "../../../models/peerReview";

interface PeerReviewByExamIdState {
  peerReviews: peerReviewByExamId[];
  isLoading: boolean;
  error: string | null;
}
const initialState: PeerReviewByExamIdState = {
  peerReviews: [],
  isLoading: false,
  error: null,
};

export const fetchPeerReviewByExamId = createAsyncThunk(
  "admin/fetchPeerReviewByExamId",
  async (examId: number) => {
    try {
      const response = await agent.peerReview.getPeerReviewByExamId(examId);
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

const peerReviewByExamIdSlice = createSlice({
  name: "peerReviewByExamId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeerReviewByExamId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPeerReviewByExamId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.peerReviews = action.payload;
      })
      .addCase(fetchPeerReviewByExamId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch reviews.";
      });
  },
});

export const peerReviewByExamIdActions = peerReviewByExamIdSlice.actions;
export default peerReviewByExamIdSlice.reducer;
