import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentVoucher } from "../../../models/voucher";

interface VoucherState {
  vouchers: currentVoucher[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VoucherState = {
  vouchers: [],
  isLoading: false,
  error: null,
};
export const fetchAllVoucherPagination = createAsyncThunk(
  "admin/fetchAllVoucherPagination",
  async (name?: string) => {
    try {
      const response = await agent.Voucher.getAllVoucher(name);
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

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVoucherPagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllVoucherPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchAllVoucherPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch vouchers.";
      });
  },
});

export const voucherActions = voucherSlice.actions;
export default voucherSlice.reducer;
