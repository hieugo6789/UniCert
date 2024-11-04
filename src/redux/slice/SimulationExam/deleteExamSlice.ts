import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteExam } from "../../../models/SimulationExam/simulationExam";

interface DeleteExamState {
  exam: deleteExam;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteExamState = {
  exam: {} as deleteExam,
  isDeleting: false,
  deleteError: false,
};

const examDeleteState = createSlice({
  name: "examDelete",
  initialState,
  reducers: {
    deleteExamStart: (state) => {
      state.isDeleting = true;
    },
    deleteExamSuccess: (state, action: PayloadAction<deleteExam>) => {
      state.isDeleting = false;
      state.exam = action.payload;
      state.deleteError = false;
    },
    deleteExamFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteExamStart, deleteExamSuccess, deleteExamFailure } =
  examDeleteState.actions;

export default examDeleteState.reducer;
