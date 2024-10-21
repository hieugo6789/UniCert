import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteVoucher } from "../../../models/voucher";

interface DeleteVoucherState {
  voucher: deleteVoucher;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteVoucherState = {
  voucher: {} as deleteVoucher,
  isDeleting: false,
  deleteError: false,
};

const voucherDeleteState = createSlice({
  name: "voucherDelete",
  initialState,
  reducers: {
    deleteVoucherStart: (state) => {
      state.isDeleting = true;
    },
    deleteVoucherSuccess: (state, action: PayloadAction<deleteVoucher>) => {
      state.isDeleting = false;
      state.voucher = action.payload;
      state.deleteError = false;
    },
    deleteVoucherFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteVoucherStart,
  deleteVoucherSuccess,
  deleteVoucherFailure,
} = voucherDeleteState.actions;

export default voucherDeleteState.reducer;
