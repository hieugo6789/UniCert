import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { summaryDashboard } from "../../../models/dashboard";

interface SummaryState {
  dashboardSummary: summaryDashboard;
  isLoading: boolean;
  error: string | null;
}

const initialState: SummaryState = {
  dashboardSummary: {} as summaryDashboard,
  isLoading: false,
  error: null,
};
export const fetchSummaryDashboard = createAsyncThunk(
  "admin/fetchSummaryDashboard",
  async () => {
    try {
      const response = await agent.Dashboard.getSummary();
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

export const fetchMonthlyRevenue = createAsyncThunk(
  "admin/fetchSummaryDashboard",
  async (year: number) => {
    try {
      const response = await agent.Dashboard.getYearRevenue(year);
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummaryDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardSummary = action.payload;
      })
      .addCase(fetchSummaryDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch job positions.";
      });
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
