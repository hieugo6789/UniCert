import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../../utils/agent";
import { AxiosError } from "axios";
import { courseEnrollment } from "../../../models/enrollment";

export interface CourseEnrollmentDetail {
  courseEnrollments: courseEnrollment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseEnrollmentDetail = {
  courseEnrollments: [],
  isLoading: false,
  error: null,
};
export const fetchCourseEnrollmentByUserId = createAsyncThunk(
  "admin/fetchCourseEnrollmentByUserId",
  async (userId: string) => {
    try {
      const response = await agent.Enrollment.getCourseByUserId(userId);
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
const CourseEnrollmentSlice = createSlice({
  name: "CourseEnrollmentDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseEnrollmentByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseEnrollmentByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseEnrollments = action.payload;
      })
      .addCase(fetchCourseEnrollmentByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch courseEnrollment.";
      });
  },
});

export const courseEnrollmentActions = CourseEnrollmentSlice.actions;

export default CourseEnrollmentSlice.reducer;
