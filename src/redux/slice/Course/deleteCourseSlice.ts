import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCourse } from "../../../models/course";

interface DeleteCourseState {
  course: deleteCourse;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteCourseState = {
  course: {} as deleteCourse,
  isDeleting: false,
  deleteError: false,
};

const courseDeleteState = createSlice({
  name: "courseDelete",
  initialState,
  reducers: {
    deleteCourseStart: (state) => {
      state.isDeleting = true;
    },
    deleteCourseSuccess: (state, action: PayloadAction<deleteCourse>) => {
      state.isDeleting = false;
      state.course = action.payload;
      state.deleteError = false;
    },
    deleteCourseFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteCourseStart, deleteCourseSuccess, deleteCourseFailure } =
  courseDeleteState.actions;

export default courseDeleteState.reducer;
