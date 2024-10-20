import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentCourse } from "../../../models/course";

interface CourseState {
  courses: currentCourse[];
  isLoading: boolean;
  error: string | null;
}
const initialState: CourseState = {
  courses: [],
  isLoading: false,
  error: null,
};

export const fetchAllCoursePagination = createAsyncThunk(
  "admin/fetchAllCoursePagination",
  async (name?: string) => {
    try {
      const response = await agent.InternalCourse.getAllCourse(name);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoursePagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoursePagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCoursePagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch courses.";
      });
  },
});

export const courseActions = courseSlice.actions;
export default courseSlice.reducer;
