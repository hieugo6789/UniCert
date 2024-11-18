import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { Students } from "../../../models/course";

interface studentListState {
  students: Students[];
  isLoading: boolean;
  error: string | null;
}
const initialState: studentListState = {
  students: [],
  isLoading: false,
  error: null,
};

export const fetchStudentList = createAsyncThunk(
  "staff/fetchStudentList",
  async (courseId: number) => {
    try {
      const response = await agent.InternalCourse.studentList(courseId);
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

const studentListSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch student list.";
      });
  },
});

export const courseActions = studentListSlice.actions;
export default studentListSlice.reducer;
