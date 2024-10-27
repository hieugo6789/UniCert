import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../../utils/agent";
import { AxiosError } from "axios";
import { examEnrollmentPayment } from "../../../models/payment";

export interface ExamEnrollmentPayment {
  examPayments: examEnrollmentPayment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamEnrollmentPayment = {
  examPayments: [],
  isLoading: false,
  error: null,
};
export const fetchAllExamPayment = createAsyncThunk(
  "admin/fetchExamPayment",
  async (userId: string) => {
    try {
      const response = await agent.Payment.examPayment(userId);
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
const ExamPayment = createSlice({
  name: "ExamPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExamPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllExamPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.examPayments = action.payload;
      })
      .addCase(fetchAllExamPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch examPayment.";
      });
  },
});

export const examPaymentActions = ExamPayment.actions;

export default ExamPayment.reducer;
