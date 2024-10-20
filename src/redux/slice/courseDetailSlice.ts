import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCourse } from "../../models/course";

export interface CourseDetail {
  currentCourse: currentCourse;
  currentUpdateCourse: currentCourse;
  isLoading: boolean;
  error: boolean;
}

const initialState: CourseDetail = {
  currentCourse: {} as currentCourse,
  currentUpdateCourse: {} as currentCourse,
  isLoading: false,
  error: false,
};
const CourseDetailSlice = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {
    CourseDetailsStart: (state) => {
      state.isLoading = true;
    },
    CourseDetailSuccess: (state, action: PayloadAction<currentCourse>) => {
      state.isLoading = false;
      state.currentCourse = action.payload;
      state.error = false;
    },
    CourseDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailCourseStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailCourseSuccess: (
      state,
      action: PayloadAction<currentCourse>
    ) => {
      state.isLoading = false;
      state.currentCourse = action.payload;
      state.error = false;
    },
    UpdateDetailCourseFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  CourseDetailsStart,
  CourseDetailSuccess,
  CourseDetailFailure,
  UpdateDetailCourseStart,
  UpdateDetailCourseSuccess,
  UpdateDetailCourseFailure,
} = CourseDetailSlice.actions;

export default CourseDetailSlice.reducer;
