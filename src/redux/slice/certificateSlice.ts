import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../utils/agent";
import { currentCertificate } from "../../models/certificate";

interface CertificateState {
  certificates: currentCertificate[];
  isLoading: boolean;
  error: string | null;
}
const initialState: CertificateState = {
  certificates: [],
  isLoading: false,
  error: null,
};

export const fetchAllCertificatePagination = createAsyncThunk(
  "admin/fetchAllCertificatePagination",
  async (name?: string) => {
    try {
      const response = await agent.Certificate.getAllCertificates(name);
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

const certificateSlice = createSlice({
  name: "Certificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCertificatePagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCertificatePagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchAllCertificatePagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch certificates.";
      });
  },
});

export const courseActions = certificateSlice.actions;
export default certificateSlice.reducer;
