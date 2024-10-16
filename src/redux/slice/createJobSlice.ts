import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentJob } from "../../models/jobPosition";

export interface CreateJobState {
  isCreating: boolean;
  createdJob: currentJob | null;
  error: boolean;
}

const initialState: CreateJobState = {
  isCreating: false,
  createdJob: null,
  error: false,
};

const createJobSlice = createSlice({
  name: "createJobPosition",
  initialState,
  reducers: {
    createJobStart: (state) => {
      state.isCreating = true;
      state.createdJob = null;
      state.error = false;
    },
    createJobSuccess: (state, action: PayloadAction<currentJob>) => {
      state.isCreating = false;
      state.createdJob = action.payload;
      state.error = false;
    },
    createJobFailure: (state) => {
      state.isCreating = false;
      state.createdJob = null;
      state.error = true;
    },
  },
});

export const { createJobStart, createJobSuccess, createJobFailure } =
  createJobSlice.actions;

export default createJobSlice.reducer;
