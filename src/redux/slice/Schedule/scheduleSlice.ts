import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentSchedule } from "../../../models/schedule";

interface ScheduleState {
  schedules: currentSchedule[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedules: [],
  isLoading: false,
  error: null,
};
export const fetchAllSchedulePagination = createAsyncThunk(
  "admin/fetchAllSchedulePagination",
  async (name?: string) => {
    try {
      const response = await agent.Schedule.getAllSchedule(name);
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

const scheduleSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSchedulePagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllSchedulePagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchAllSchedulePagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch schedules.";
      });
  },
});

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;
