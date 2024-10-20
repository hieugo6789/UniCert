import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";

export interface Major {
  majorId: string;
  majorCode: string;
  majorName: string;
  majorDescription: string;
}

interface MajorState {
  majors: Major[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MajorState = {
  majors: [],
  isLoading: false,
  error: null,
};

export const fetchAllMajorPagination = createAsyncThunk(
  "admin/fetchAllMajorPagination",
  async (name?: string) => {
    try {
      const response = await agent.Major.getAllMajors(name);
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
const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMajorPagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMajorPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.majors = action.payload;
      })
      .addCase(fetchAllMajorPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch majors.";
      });
  },
});

export const majorActions = majorSlice.actions;
export default majorSlice.reducer;
