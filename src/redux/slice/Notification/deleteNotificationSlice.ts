import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteNotification } from "../../../models/notification";

interface DeleteNotificationState {
  notification: deleteNotification;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteNotificationState = {
  notification: {} as deleteNotification,
  isDeleting: false,
  deleteError: false,
};

const notificationDeleteState = createSlice({
  name: "notificationDelete",
  initialState,
  reducers: {
    deleteNotificationStart: (state) => {
      state.isDeleting = true;
    },
    deleteNotificationSuccess: (
      state,
      action: PayloadAction<deleteNotification>
    ) => {
      state.isDeleting = false;
      state.notification = action.payload;
      state.deleteError = false;
    },
    deleteNotificationFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailure,
} = notificationDeleteState.actions;

export default notificationDeleteState.reducer;
