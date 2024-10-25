import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentVoucher } from "../../../models/voucher";

export interface CreateVoucherState {
  isCreating: boolean;
  createdVoucher: currentVoucher | null;
  error: boolean;
}

const initialState: CreateVoucherState = {
  isCreating: false,
  createdVoucher: null,
  error: false,
};

const createVoucherSlice = createSlice({
  name: "createVoucher",
  initialState,
  reducers: {
    createVoucherStart: (state) => {
      state.isCreating = true;
      state.createdVoucher = null;
      state.error = false;
    },
    createVoucherSuccess: (state, action: PayloadAction<currentVoucher>) => {
      state.isCreating = false;
      state.createdVoucher = action.payload;
      state.error = false;
    },
    createVoucherFailure: (state) => {
      state.isCreating = false;
      state.createdVoucher = null;
      state.error = true;
    },
  },
});

export const {
  createVoucherStart,
  createVoucherSuccess,
  createVoucherFailure,
} = createVoucherSlice.actions;

export default createVoucherSlice.reducer;
