import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePeerReview } from "../../../models/peerReview";

interface DeleteOrganizationState {
  peerReview: deletePeerReview;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteOrganizationState = {
  peerReview: {} as deletePeerReview,
  isDeleting: false,
  deleteError: false,
};

const peerReviewDeleteState = createSlice({
  name: "peerReviewDelete",
  initialState,
  reducers: {
    deletePeerReviewStart: (state) => {
      state.isDeleting = true;
    },
    deletePeerReviewSuccess: (
      state,
      action: PayloadAction<deletePeerReview>
    ) => {
      state.isDeleting = false;
      state.peerReview = action.payload;
      state.deleteError = false;
    },
    deletePeerReviewFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deletePeerReviewStart,
  deletePeerReviewSuccess,
  deletePeerReviewFailure,
} = peerReviewDeleteState.actions;

export default peerReviewDeleteState.reducer;
