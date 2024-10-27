import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentExamEnrollment } from "../../../models/enrollment";

export interface CreateExamEnrollmentState {
  isCreating: boolean;
  createdExamEnrollment: currentExamEnrollment | null;
  error: boolean;
}

const initialState: CreateExamEnrollmentState = {
  isCreating: false,
  createdExamEnrollment: null,
  error: false,
};

const createExamEnrollmentSlice = createSlice({
  name: "createExamEnrollment",
  initialState,
  reducers: {
    createExamEnrollmentStart: (state) => {
      state.isCreating = true;
      state.createdExamEnrollment = null;
      state.error = false;
    },
    createExamEnrollmentSuccess: (
      state,
      action: PayloadAction<currentExamEnrollment>
    ) => {
      state.isCreating = false;
      state.createdExamEnrollment = action.payload;
      state.error = false;
    },
    createExamEnrollmentFailure: (state) => {
      state.isCreating = false;
      state.createdExamEnrollment = null;
      state.error = true;
    },
  },
});

export const {
  createExamEnrollmentStart,
  createExamEnrollmentSuccess,
  createExamEnrollmentFailure,
} = createExamEnrollmentSlice.actions;

export default createExamEnrollmentSlice.reducer;
