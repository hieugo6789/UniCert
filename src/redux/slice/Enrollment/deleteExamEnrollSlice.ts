import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteExamEnrollment } from "../../../models/enrollment";

interface DeleteExamState {
  examEnrollment: deleteExamEnrollment;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteExamState = {
  examEnrollment: {} as deleteExamEnrollment,
  isDeleting: false,
  deleteError: false,
};

const examEnrollmentDeleteState = createSlice({
  name: "examEnrollmentDelete",
  initialState,
  reducers: {
    deleteExamStart: (state) => {
      state.isDeleting = true;
    },
    deleteExamSuccess: (state, action: PayloadAction<deleteExamEnrollment>) => {
      state.isDeleting = false;
      state.examEnrollment = action.payload;
      state.deleteError = false;
    },
    deleteExamFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteExamStart, deleteExamSuccess, deleteExamFailure } =
  examEnrollmentDeleteState.actions;

export default examEnrollmentDeleteState.reducer;
