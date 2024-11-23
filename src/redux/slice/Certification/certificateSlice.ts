import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentCertificate } from "../../../models/certificate";

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
  async ({
    name,
    pageNumber,
    pageSize,
    permission,
  }: {
    name?: string;
    pageNumber?: number;
    pageSize?: number;
    permission?: number;
  }) => {
    try {
      const response = await agent.Certificate.getAllCertificates(
        name,
        pageNumber,
        pageSize,
        permission
      );
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
export const fetchTopCertificate = createAsyncThunk(
  "students/fetchTopCertificate",
  async (topN: number) => {
    try {
      const response = await agent.Certificate.getTopCertification(topN);
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

export const fetchAllCertification = createAsyncThunk(
  "staff/fetchAllCertification",
  async () => {
    try {
      const response = await agent.Certificate.getAllCertifications();
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
