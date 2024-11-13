import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createScore } from "../../../models/score";

export interface CrateScore {
  isCreating: boolean;
  createdScore: createScore | null;
  error: boolean;
}

const initialState: CrateScore = {
  isCreating: false,
  createdScore: null,
  error: false,
};

const createScoreSlice = createSlice({
  name: "createScorePosition",
  initialState,
  reducers: {
    createScoreStart: (state) => {
      state.isCreating = true;
      state.createdScore = null;
      state.error = false;
    },
    createScoreSuccess: (state, action: PayloadAction<createScore>) => {
      state.isCreating = false;
      state.createdScore = action.payload;
      state.error = false;
    },
    createScoreFailure: (state) => {
      state.isCreating = false;
      state.createdScore = null;
      state.error = true;
    },
    clearScore: (state) => {
      state.isCreating = false;
      state.createdScore = null;
      state.error = false;
    },
  },
});

export const { createScoreStart, createScoreSuccess, createScoreFailure, clearScore } =
  createScoreSlice.actions;
export default createScoreSlice.reducer;
