import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentSchedule } from "../../../models/schedule";

export interface CreateScheduleState {
  isCreating: boolean;
  createdSchedule: currentSchedule | null;
  error: boolean;
}

const initialState: CreateScheduleState = {
  isCreating: false,
  createdSchedule: null,
  error: false,
};

const createScheduleSlice = createSlice({
  name: "createSchedule",
  initialState,
  reducers: {
    createScheduleStart: (state) => {
      state.isCreating = true;
      state.createdSchedule = null;
      state.error = false;
    },
    createScheduleSuccess: (state, action: PayloadAction<currentSchedule>) => {
      state.isCreating = false;
      state.createdSchedule = action.payload;
      state.error = false;
    },
    createScheduleFailure: (state) => {
      state.isCreating = false;
      state.createdSchedule = null;
      state.error = true;
    },
  },
});

export const {
  createScheduleStart,
  createScheduleSuccess,
  createScheduleFailure,
} = createScheduleSlice.actions;

export default createScheduleSlice.reducer;
