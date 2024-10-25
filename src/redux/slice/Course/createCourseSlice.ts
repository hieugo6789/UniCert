import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createCourse } from "../../../models/course";

export interface CreateCourseState {
  isCreating: boolean;
  createdCourse: createCourse | null;
  error: boolean;
}

const initialState: CreateCourseState = {
  isCreating: false,
  createdCourse: null,
  error: false,
};

const createCourseSlice = createSlice({
  name: "createCourse",
  initialState,
  reducers: {
    createCourseStart: (state) => {
      state.isCreating = true;
      state.createdCourse = null;
      state.error = false;
    },
    createCourseSuccess: (state, action: PayloadAction<createCourse>) => {
      state.isCreating = false;
      state.createdCourse = action.payload;
      state.error = false;
    },
    createCourseFailure: (state) => {
      state.isCreating = false;
      state.createdCourse = null;
      state.error = true;
    },
  },
});

export const { createCourseStart, createCourseSuccess, createCourseFailure } =
  createCourseSlice.actions;

export default createCourseSlice.reducer;
