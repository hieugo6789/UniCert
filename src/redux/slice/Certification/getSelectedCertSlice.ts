import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";

interface Certificate {
  id: string;
  name: string;
  issuedDate: string;
  // Các thuộc tính khác của chứng chỉ
}

interface CertificateState {
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  isLoading: false,
  error: null,
};

// Thunk để fetch chứng chỉ của user dựa theo userId
export const fetchCertificatesByUser = createAsyncThunk(
  "selectedCert/fetchCertificatesByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await agent.selectedCert.getByUser(userId);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.error?.message || "Failed to fetch certificates."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const getSelectedCert = createSlice({
  name: "selectedCert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificatesByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCertificatesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificatesByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default getSelectedCert.reducer;
