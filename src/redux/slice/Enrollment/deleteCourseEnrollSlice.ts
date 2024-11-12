import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCourseEnrollment } from "../../../models/enrollment";

interface DeleteCourseState {
  courseEnrollment: deleteCourseEnrollment;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteCourseState = {
  courseEnrollment: {} as deleteCourseEnrollment,
  isDeleting: false,
  deleteError: false,
};

const courseEnrollmentDeleteState = createSlice({
  name: "courseEnrollmentDelete",
  initialState,
  reducers: {
    deleteCourseStart: (state) => {
      state.isDeleting = true;
    },
    deleteCourseSuccess: (
      state,
      action: PayloadAction<deleteCourseEnrollment>
    ) => {
      state.isDeleting = false;
      state.courseEnrollment = action.payload;
      state.deleteError = false;
    },
    deleteCourseFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteCourseStart, deleteCourseSuccess, deleteCourseFailure } =
  courseEnrollmentDeleteState.actions;

export default courseEnrollmentDeleteState.reducer;
