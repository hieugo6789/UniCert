import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../../utils/agent";
import { AxiosError } from "axios";
import { courseEnrollmentPayment } from "../../../models/payment";

export interface CourseEnrollmentPayment {
  coursePayments: courseEnrollmentPayment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseEnrollmentPayment = {
  coursePayments: [],
  isLoading: false,
  error: null,
};
export const fetchAllCoursePayment = createAsyncThunk(
  "admin/fetchCoursePayment",
  async (userId: string) => {
    try {
      const response = await agent.Payment.coursePayment(userId);
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
const CoursePayment = createSlice({
  name: "CoursePayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoursePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoursePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coursePayments = action.payload;
      })
      .addCase(fetchAllCoursePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch coursePayment.";
      });
  },
});

export const coursePaymentActions = CoursePayment.actions;

export default CoursePayment.reducer;
