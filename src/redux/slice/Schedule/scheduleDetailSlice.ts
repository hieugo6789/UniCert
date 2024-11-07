import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentSchedule } from "../../../models/schedule";

export interface ScheduleDetail {
  currentSchedule: currentSchedule;
  currentUpdateDetail: currentSchedule;
  isLoading: boolean;
  error: boolean;
}

const initialState: ScheduleDetail = {
  currentSchedule: {} as currentSchedule,
  currentUpdateDetail: {} as currentSchedule,
  isLoading: false,
  error: false,
};
const ScheduleDetailSlice = createSlice({
  name: "scheduleDetail",
  initialState,
  reducers: {
    ScheduleDetailsStart: (state) => {
      state.isLoading = true;
    },
    ScheduleDetailSuccess: (state, action: PayloadAction<currentSchedule>) => {
      state.isLoading = false;
      state.currentSchedule = action.payload;
      state.error = false;
    },
    ScheduleDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailScheduleStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailScheduleSuccess: (
      state,
      action: PayloadAction<currentSchedule>
    ) => {
      state.isLoading = false;
      state.currentSchedule = action.payload;
      state.error = false;
    },
    UpdateDetailScheduleFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  ScheduleDetailsStart,
  ScheduleDetailSuccess,
  ScheduleDetailFailure,
  UpdateDetailScheduleStart,
  UpdateDetailScheduleSuccess,
  UpdateDetailScheduleFailure,
} = ScheduleDetailSlice.actions;

export default ScheduleDetailSlice.reducer;
