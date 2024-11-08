import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { score } from "../../../models/score";

export interface scoreDetail {
  currentScore: score[];
  isLoading: boolean;
  error: boolean;
}

const initialState: scoreDetail = {
  currentScore: {} as score[],
  isLoading: false,
  error: false,
};
const ScoreDetailSlice = createSlice({
  name: "scoreDetail",
  initialState,
  reducers: {
    ScoreDetailsStart: (state) => {
      state.isLoading = true;
    },
    ScoreDetailSuccess: (state, action: PayloadAction<score[]>) => {
      state.isLoading = false;
      state.currentScore = action.payload;
      state.error = false;
    },
    ScoreDetailFailure: (state) => {
      state.isLoading = false;
      state.currentScore = [];
      state.error = true;
    },
  },
});

export const {
  ScoreDetailsStart,
  ScoreDetailSuccess,
  ScoreDetailFailure,
} = ScoreDetailSlice.actions;

export default ScoreDetailSlice.reducer;
