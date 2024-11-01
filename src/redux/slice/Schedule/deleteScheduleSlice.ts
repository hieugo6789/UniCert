import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSchedule } from "../../../models/schedule";

interface DeleteScheduleState {
  schedule: deleteSchedule;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteScheduleState = {
  schedule: {} as deleteSchedule,
  isDeleting: false,
  deleteError: false,
};

const scheduleDeleteState = createSlice({
  name: "scheduleDelete",
  initialState,
  reducers: {
    deleteScheduleStart: (state) => {
      state.isDeleting = true;
    },
    deleteScheduleSuccess: (state, action: PayloadAction<deleteSchedule>) => {
      state.isDeleting = false;
      state.schedule = action.payload;
      state.deleteError = false;
    },
    deleteScheduleFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteScheduleStart,
  deleteScheduleSuccess,
  deleteScheduleFailure,
} = scheduleDeleteState.actions;

export default scheduleDeleteState.reducer;
