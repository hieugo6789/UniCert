import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentJob } from "../../../models/jobPosition";

// Define the interface for the state
interface JobState {
  jobs: currentJob[];
  isLoading: boolean;
  error: string | null;
}

// Define the structure of the error object that the rejected case will handle
interface JobError {
  message: string;
  status: number | undefined;
}

// Initial state for the slice
const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
};

export const getRecommedByUser = createAsyncThunk<
  currentJob[], // The expected type of the fulfilled payload
  string, // The argument type (userId)
  { rejectValue: JobError } // The type for rejected value
>(
  "job/getRecommedByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await agent.JobPosition.getRecommedByUser(userId);
      return response; // Assuming this returns the list of jobs
    } catch (error) {
      if (error instanceof AxiosError) {
        // Use rejectWithValue to return a custom error structure
        return rejectWithValue({
          message: error.response?.data.error.message || "An error occurred",
          status: error.response?.status,
        });
      }
      throw error; // Re-throw other errors
    }
  }
);

// Create the job slice
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state of getRecommedByUser
      .addCase(getRecommedByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset the error when the request starts
      })
      // Handle the fulfilled state of getRecommedByUser
      .addCase(getRecommedByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the action payload is the list of recommended jobs
        state.jobs = action.payload;
      })
      // Handle the rejected state of getRecommedByUser
      .addCase(getRecommedByUser.rejected, (state, action) => {
        state.isLoading = false;
        // Handle the error message from action
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message || "Failed to fetch recommended jobs.";
        }
      });
  },
});

// Export the actions and reducer
export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
