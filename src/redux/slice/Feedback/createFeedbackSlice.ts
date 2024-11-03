import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentFeedback } from "../../../models/feedback";

export interface CreateFeedbackState {
  isCreating: boolean;
  createdFeedback: currentFeedback | null;
  error: boolean;
}

const initialState: CreateFeedbackState = {
  isCreating: false,
  createdFeedback: null,
  error: false,
};

const createFeedbackSlice = createSlice({
  name: "createFeedback",
  initialState,
  reducers: {
    createFeedbackStart: (state) => {
      state.isCreating = true;
      state.createdFeedback = null;
      state.error = false;
    },
    createFeedbackSuccess: (state, action: PayloadAction<currentFeedback>) => {
      state.isCreating = false;
      state.createdFeedback = action.payload;
      state.error = false;
    },
    createFeedbackFailure: (state) => {
      state.isCreating = false;
      state.createdFeedback = null;
      state.error = true;
    },
  },
});

export const {
  createFeedbackStart,
  createFeedbackSuccess,
  createFeedbackFailure,
} = createFeedbackSlice.actions;

export default createFeedbackSlice.reducer;
