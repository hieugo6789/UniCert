import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentExam } from "../../../models/SimulationExam/simulationExam";

interface ExamState {
  exams: currentExam[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamState = {
  exams: [],
  isLoading: false,
  error: null,
};
export const fetchAllExamPagination = createAsyncThunk(
  "admin/fetchAllExamPagination",
  async (name?: string) => {
    try {
      const response = await agent.SimulationExam.getAllSimulationExam(name);
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
export const fetchExamByCertId = createAsyncThunk(
  "student/fetchExam",
  async (certId: number) => {
    try {
      const response = await agent.SimulationExam.getSimulationExamCertId(
        certId
      );
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

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExamPagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllExamPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exams = action.payload;
      })
      .addCase(fetchAllExamPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch organizations.";
      });
  },
});

export const examActions = examSlice.actions;
export default examSlice.reducer;
