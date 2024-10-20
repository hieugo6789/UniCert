import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentCertType } from "../../../models/certType";

interface TypeState {
  certTypes: currentCertType[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TypeState = {
  certTypes: [],
  isLoading: false,
  error: null,
};
export const fetchAllTypePagination = createAsyncThunk(
  "admin/fetchAllTypePagination",
  async () => {
    try {
      const response = await agent.CertType.getCertType();
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

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTypePagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTypePagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certTypes = action.payload;
      })
      .addCase(fetchAllTypePagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch certTypes.";
      });
  },
});

export const typeActions = typeSlice.actions;
export default typeSlice.reducer;
