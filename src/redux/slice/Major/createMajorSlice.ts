import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentMajor } from "../../../models/major";

export interface CreateMajorState {
  isCreating: boolean;
  createdMajor: currentMajor | null;
  error: boolean;
}

const initialState: CreateMajorState = {
  isCreating: false,
  createdMajor: null,
  error: false,
};

const createMajorSlice = createSlice({
  name: "createMajor",
  initialState,
  reducers: {
    createMajorStart: (state) => {
      state.isCreating = true;
      state.createdMajor = null;
      state.error = false;
    },
    createMajorSuccess: (state, action: PayloadAction<currentMajor>) => {
      state.isCreating = false;
      state.createdMajor = action.payload;
      state.error = false;
    },
    createMajorFailure: (state) => {
      state.isCreating = false;
      state.createdMajor = null;
      state.error = true;
    },
  },
});

export const { createMajorStart, createMajorSuccess, createMajorFailure } =
  createMajorSlice.actions;

export default createMajorSlice.reducer;
