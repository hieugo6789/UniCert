import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCourseEnrollment } from "../../../models/enrollment";

export interface CourseEnrollmentDetail {
  currentCourseEnrollment: currentCourseEnrollment;
  isLoading: boolean;
  error: boolean;
}

const initialState: CourseEnrollmentDetail = {
  currentCourseEnrollment: {} as currentCourseEnrollment,
  isLoading: false,
  error: false,
};
const CourseEnrollmentDetailSlice = createSlice({
  name: "courseEnrollmentDetail",
  initialState,
  reducers: {
    CourseEnrollmentDetailsStart: (state) => {
      state.isLoading = true;
    },
    CourseEnrollmentDetailSuccess: (
      state,
      action: PayloadAction<currentCourseEnrollment>
    ) => {
      state.isLoading = false;
      state.currentCourseEnrollment = action.payload;
      state.error = false;
    },
    CourseEnrollmentDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  CourseEnrollmentDetailsStart,
  CourseEnrollmentDetailSuccess,
  CourseEnrollmentDetailFailure,
} = CourseEnrollmentDetailSlice.actions;

export default CourseEnrollmentDetailSlice.reducer;
