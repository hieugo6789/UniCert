import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentExamDetail } from "../../../models/simulationExam";

export interface ExamDetail {
  currentExam: currentExamDetail;
  currentUpdateDetail: currentExamDetail;
  isLoading: boolean;
  error: boolean;
}

const initialState: ExamDetail = {
  currentExam: {} as currentExamDetail,
  currentUpdateDetail: {} as currentExamDetail,
  isLoading: false,
  error: false,
};
const ExamDetailSlice = createSlice({
  name: "examDetail",
  initialState,
  reducers: {
    ExamDetailsStart: (state) => {
      state.isLoading = true;
    },
    ExamDetailSuccess: (state, action: PayloadAction<currentExamDetail>) => {
      state.isLoading = false;
      state.currentExam = action.payload;
      state.error = false;
    },
    ExamDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailExamStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailExamSuccess: (
      state,
      action: PayloadAction<currentExamDetail>
    ) => {
      state.isLoading = false;
      state.currentExam = action.payload;
      state.error = false;
    },
    UpdateDetailExamFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  ExamDetailsStart,
  ExamDetailSuccess,
  ExamDetailFailure,
  UpdateDetailExamStart,
  UpdateDetailExamSuccess,
  UpdateDetailExamFailure,
} = ExamDetailSlice.actions;

export default ExamDetailSlice.reducer;
