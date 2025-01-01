import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createPeerReview } from "../../../models/peerReview";

export interface CreatePeerReviewState {
  isCreating: boolean;
  createdPeerReview: createPeerReview | null;
  error: boolean;
}

const initialState: CreatePeerReviewState = {
  isCreating: false,
  createdPeerReview: null,
  error: false,
};

const createPeerReviewSlice = createSlice({
  name: "createPeerReview",
  initialState,
  reducers: {
    createPeerReviewStart: (state) => {
      state.isCreating = true;
      state.createdPeerReview = null;
      state.error = false;
    },
    createPeerReviewSuccess: (
      state,
      action: PayloadAction<createPeerReview>
    ) => {
      state.isCreating = false;
      state.createdPeerReview = action.payload;
      state.error = false;
    },
    createPeerReviewFailure: (state) => {
      state.isCreating = false;
      state.createdPeerReview = null;
      state.error = true;
    },
  },
});

export const {
  createPeerReviewStart,
  createPeerReviewSuccess,
  createPeerReviewFailure,
} = createPeerReviewSlice.actions;

export default createPeerReviewSlice.reducer;
