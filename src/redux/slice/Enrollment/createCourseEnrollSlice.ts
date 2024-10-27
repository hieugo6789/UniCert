import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCourseEnrollment } from "../../../models/enrollment";

export interface CreateCourseEnrollmentState {
  isCreating: boolean;
  createdCourseEnrollment: currentCourseEnrollment | null;
  error: boolean;
}

const initialState: CreateCourseEnrollmentState = {
  isCreating: false,
  createdCourseEnrollment: null,
  error: false,
};

const createCourseEnrollmentSlice = createSlice({
  name: "createCourseEnrollment",
  initialState,
  reducers: {
    createCourseEnrollmentStart: (state) => {
      state.isCreating = true;
      state.createdCourseEnrollment = null;
      state.error = false;
    },
    createCourseEnrollmentSuccess: (
      state,
      action: PayloadAction<currentCourseEnrollment>
    ) => {
      state.isCreating = false;
      state.createdCourseEnrollment = action.payload;
      state.error = false;
    },
    createCourseEnrollmentFailure: (state) => {
      state.isCreating = false;
      state.createdCourseEnrollment = null;
      state.error = true;
    },
  },
});

export const {
  createCourseEnrollmentStart,
  createCourseEnrollmentSuccess,
  createCourseEnrollmentFailure,
} = createCourseEnrollmentSlice.actions;

export default createCourseEnrollmentSlice.reducer;
