import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { peerReviewById, updatePeerReview } from "../../../models/peerReview";

export interface PeerReviewDetail {
  currentPeerReview: peerReviewById;
  currentUpdateDetail: updatePeerReview;
  isLoading: boolean;
  error: boolean;
}

const initialState: PeerReviewDetail = {
  currentPeerReview: {} as peerReviewById,
  currentUpdateDetail: {} as updatePeerReview,
  isLoading: false,
  error: false,
};
const PeerReviewDetailSlice = createSlice({
  name: "peerReviewDetail",
  initialState,
  reducers: {
    PeerReviewDetailsStart: (state) => {
      state.isLoading = true;
    },
    PeerReviewDetailSuccess: (state, action: PayloadAction<peerReviewById>) => {
      state.isLoading = false;
      state.currentPeerReview = action.payload;
      state.error = false;
    },
    PeerReviewDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailPeerReviewStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailPeerReviewSuccess: (
      state,
      action: PayloadAction<peerReviewById>
    ) => {
      state.isLoading = false;
      state.currentPeerReview = action.payload;
      state.error = false;
    },
    UpdateDetailPeerReviewFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  PeerReviewDetailsStart,
  PeerReviewDetailSuccess,
  PeerReviewDetailFailure,
  UpdateDetailPeerReviewStart,
  UpdateDetailPeerReviewSuccess,
  UpdateDetailPeerReviewFailure,
} = PeerReviewDetailSlice.actions;

export default PeerReviewDetailSlice.reducer;
