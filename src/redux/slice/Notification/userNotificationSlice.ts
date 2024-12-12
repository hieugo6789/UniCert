import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentNotification } from "../../../models/notification";

interface UserNotificationState {
  notifications: currentNotification[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserNotificationState = {
  notifications: [],
  isLoading: false,
  error: null,
};
export const fetchNotificationByUserId = createAsyncThunk(
  "user/fetchNotificationByUserId",
  async (userId: number) => {
    try {
      const response = await agent.Notification.getUserNotification(userId);
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

const userNotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotificationByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch notification.";
      });
  },
});

export const notificationActions = userNotificationSlice.actions;
export default userNotificationSlice.reducer;
