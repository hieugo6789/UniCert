import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentQuestion } from "../../../../models/SimulationExam/question";

export interface QuestionDetail {
  currentQuestion: currentQuestion;
  currentUpdateDetail: currentQuestion;
  isLoading: boolean;
  error: boolean;
}

const initialState: QuestionDetail = {
  currentQuestion: {} as currentQuestion,
  currentUpdateDetail: {} as currentQuestion,
  isLoading: false,
  error: false,
};
const QuestionDetailSlice = createSlice({
  name: "questionDetail",
  initialState,
  reducers: {
    QuestionDetailsStart: (state) => {
      state.isLoading = true;
    },
    QuestionDetailSuccess: (state, action: PayloadAction<currentQuestion>) => {
      state.isLoading = false;
      state.currentQuestion = action.payload;
      state.error = false;
    },
    QuestionDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailQuestionStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailQuestionSuccess: (
      state,
      action: PayloadAction<currentQuestion>
    ) => {
      state.isLoading = false;
      state.currentQuestion = action.payload;
      state.error = false;
    },
    UpdateDetailQuestionFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  QuestionDetailsStart,
  QuestionDetailSuccess,
  QuestionDetailFailure,
  UpdateDetailQuestionStart,
  UpdateDetailQuestionSuccess,
  UpdateDetailQuestionFailure,
} = QuestionDetailSlice.actions;

export default QuestionDetailSlice.reducer;
