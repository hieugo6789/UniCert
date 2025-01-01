import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { peerReviewByScoreId } from "../../../models/peerReview";

interface PeerReviewByScoreIdState {
  peerReviews: peerReviewByScoreId[];
  isLoading: boolean;
  error: string | null;
}
const initialState: PeerReviewByScoreIdState = {
  peerReviews: [],
  isLoading: false,
  error: null,
};

export const fetchPeerReviewByScoreId = createAsyncThunk(
  "admin/fetchPeerReviewByScoreId",
  async (scoreId: number) => {
    try {
      const response = await agent.peerReview.getPeerReviewByScoreId(scoreId);
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

const peerReviewByScoreIdSlice = createSlice({
  name: "peerReviewByScoreId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeerReviewByScoreId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPeerReviewByScoreId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.peerReviews = action.payload;
      })
      .addCase(fetchPeerReviewByScoreId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch reviews.";
      });
  },
});

export const peerReviewByScoreIdActions = peerReviewByScoreIdSlice.actions;
export default peerReviewByScoreIdSlice.reducer;
