import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { examEnrollment } from "../../../models/enrollment";
import agent from "../../../utils/agent";
import { AxiosError } from "axios";

export interface ExamEnrollmentDetail {
  examEnrollments: examEnrollment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamEnrollmentDetail = {
  examEnrollments: [],
  isLoading: false,
  error: null,
};
export const fetchExamEnrollmentByUserId = createAsyncThunk(
  "admin/fetchExamEnrollmentByUserId",
  async (userId: string) => {
    try {
      const response = await agent.Enrollment.getExamByUserId(userId);
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
const ExamEnrollmentSlice = createSlice({
  name: "ExamEnrollmentDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamEnrollmentByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamEnrollmentByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examEnrollments = action.payload;
      })
      .addCase(fetchExamEnrollmentByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch examEnrollment.";
      });
  },
});

export const examEnrollmentActions = ExamEnrollmentSlice.actions;

export default ExamEnrollmentSlice.reducer;
