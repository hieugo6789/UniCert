import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentQuestion } from "../../../../models/SimulationExam/question";

export interface CreateQuestionState {
  isCreating: boolean;
  createdQuestion: currentQuestion | null;
  error: boolean;
}

const initialState: CreateQuestionState = {
  isCreating: false,
  createdQuestion: null,
  error: false,
};

const createQuestionSlice = createSlice({
  name: "createQuestion",
  initialState,
  reducers: {
    createQuestionStart: (state) => {
      state.isCreating = true;
      state.createdQuestion = null;
      state.error = false;
    },
    createQuestionSuccess: (state, action: PayloadAction<currentQuestion>) => {
      state.isCreating = false;
      state.createdQuestion = action.payload;
      state.error = false;
    },
    createQuestionFailure: (state) => {
      state.isCreating = false;
      state.createdQuestion = null;
      state.error = true;
    },
  },
});

export const {
  createQuestionStart,
  createQuestionSuccess,
  createQuestionFailure,
} = createQuestionSlice.actions;

export default createQuestionSlice.reducer;
