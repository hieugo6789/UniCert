import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentVoucher } from "../../../models/voucher";

export interface VoucherDetail {
  currentVoucher: currentVoucher;
  currentUpdateDetail: currentVoucher;
  isLoading: boolean;
  error: boolean;
}

const initialState: VoucherDetail = {
  currentVoucher: {} as currentVoucher,
  currentUpdateDetail: {} as currentVoucher,
  isLoading: false,
  error: false,
};
const VoucherDetailSlice = createSlice({
  name: "voucherDetail",
  initialState,
  reducers: {
    VoucherDetailsStart: (state) => {
      state.isLoading = true;
    },
    VoucherDetailSuccess: (state, action: PayloadAction<currentVoucher>) => {
      state.isLoading = false;
      state.currentVoucher = action.payload;
      state.error = false;
    },
    VoucherDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailVoucherStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailVoucherSuccess: (
      state,
      action: PayloadAction<currentVoucher>
    ) => {
      state.isLoading = false;
      state.currentVoucher = action.payload;
      state.error = false;
    },
    UpdateDetailVoucherFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  VoucherDetailsStart,
  VoucherDetailSuccess,
  VoucherDetailFailure,
  UpdateDetailVoucherStart,
  UpdateDetailVoucherSuccess,
  UpdateDetailVoucherFailure,
} = VoucherDetailSlice.actions;

export default VoucherDetailSlice.reducer;
