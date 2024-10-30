import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentExamDetail } from "../../../models/simulationExam";

export interface CreateExamState {
  isCreating: boolean;
  createdExam: currentExamDetail | null;
  error: boolean;
}

const initialState: CreateExamState = {
  isCreating: false,
  createdExam: null,
  error: false,
};

const createExamSlice = createSlice({
  name: "createExamPosition",
  initialState,
  reducers: {
    createExamStart: (state) => {
      state.isCreating = true;
      state.createdExam = null;
      state.error = false;
    },
    createExamSuccess: (state, action: PayloadAction<currentExamDetail>) => {
      state.isCreating = false;
      state.createdExam = action.payload;
      state.error = false;
    },
    createExamFailure: (state) => {
      state.isCreating = false;
      state.createdExam = null;
      state.error = true;
    },
  },
});

export const { createExamStart, createExamSuccess, createExamFailure } =
  createExamSlice.actions;

export default createExamSlice.reducer;
