import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentJob } from "../../../models/jobPosition";

interface JobState {
  jobs: currentJob[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
};
export const fetchAllJobPagination = createAsyncThunk(
  "admin/fetchAllJobPagination",
  async (name?: string) => {
    try {
      const response = await agent.JobPosition.getAllJob(name);
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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobPagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllJobPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch job positions.";
      });
  },
});

export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
