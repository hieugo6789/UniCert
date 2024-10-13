import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteJob } from "../../models/jobPosition";

interface DeleteJobState {
  job: deleteJob;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteJobState = {
  job: {} as deleteJob,
  isDeleting: false,
  deleteError: false,
};

const jobDeleteState = createSlice({
  name: "jobDelete",
  initialState,
  reducers: {
    deleteJobStart: (state) => {
      state.isDeleting = true;
    },
    deleteJobSuccess: (state, action: PayloadAction<deleteJob>) => {
      state.isDeleting = false;
      state.job = action.payload;
      state.deleteError = false;
    },
    deleteJobFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteJobStart, deleteJobSuccess, deleteJobFailure } =
  jobDeleteState.actions;

export default jobDeleteState.reducer;
