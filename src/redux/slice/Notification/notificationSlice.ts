import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentNotification } from "../../../models/notification";

interface NotificationState {
  notifications: currentNotification[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  error: null,
};
export const fetchAllNotification = createAsyncThunk(
  "manager/fetchAllNotification",
  async (role: string) => {
    try {
      const response = await agent.Notification.getNotification(role);
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

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchAllNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch notification.";
      });
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
