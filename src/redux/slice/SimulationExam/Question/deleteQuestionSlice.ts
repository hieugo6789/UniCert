import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteQuestion } from "../../../../models/SimulationExam/question";

interface DeleteQuestionState {
  question: deleteQuestion;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteQuestionState = {
  question: {} as deleteQuestion,
  isDeleting: false,
  deleteError: false,
};

const questionDeleteState = createSlice({
  name: "questionDelete",
  initialState,
  reducers: {
    deleteQuestionStart: (state) => {
      state.isDeleting = true;
    },
    deleteQuestionSuccess: (state, action: PayloadAction<deleteQuestion>) => {
      state.isDeleting = false;
      state.question = action.payload;
      state.deleteError = false;
    },
    deleteQuestionFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteQuestionStart,
  deleteQuestionSuccess,
  deleteQuestionFailure,
} = questionDeleteState.actions;

export default questionDeleteState.reducer;
