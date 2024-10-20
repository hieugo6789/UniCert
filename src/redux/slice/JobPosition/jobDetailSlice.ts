import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentJob } from "../../../models/jobPosition";

export interface JobDetail {
  currentJob: currentJob;
  currentUpdateDetail: currentJob;
  isLoading: boolean;
  error: boolean;
}

const initialState: JobDetail = {
  currentJob: {} as currentJob,
  currentUpdateDetail: {} as currentJob,
  isLoading: false,
  error: false,
};
const JobDetailSlice = createSlice({
  name: "jobDetail",
  initialState,
  reducers: {
    JobDetailsStart: (state) => {
      state.isLoading = true;
    },
    JobDetailSuccess: (state, action: PayloadAction<currentJob>) => {
      state.isLoading = false;
      state.currentJob = action.payload;
      state.error = false;
    },
    JobDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailJobStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailJobSuccess: (state, action: PayloadAction<currentJob>) => {
      state.isLoading = false;
      state.currentJob = action.payload;
      state.error = false;
    },
    UpdateDetailJobFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  JobDetailsStart,
  JobDetailSuccess,
  JobDetailFailure,
  UpdateDetailJobStart,
  UpdateDetailJobSuccess,
  UpdateDetailJobFailure,
} = JobDetailSlice.actions;

export default JobDetailSlice.reducer;
