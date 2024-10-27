import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentPayment } from "../../../models/payment";

export interface CreatePaymentState {
  isCreating: boolean;
  createdPayment: currentPayment | null;
  error: boolean;
}

const initialState: CreatePaymentState = {
  isCreating: false,
  createdPayment: null,
  error: false,
};

const createPaymentSlice = createSlice({
  name: "createPayment",
  initialState,
  reducers: {
    createPaymentStart: (state) => {
      state.isCreating = true;
      state.createdPayment = null;
      state.error = false;
    },
    createPaymentSuccess: (state, action: PayloadAction<currentPayment>) => {
      state.isCreating = false;
      state.createdPayment = action.payload;
      state.error = false;
    },
    createPaymentFailure: (state) => {
      state.isCreating = false;
      state.createdPayment = null;
      state.error = true;
    },
  },
});

export const {
  createPaymentStart,
  createPaymentSuccess,
  createPaymentFailure,
} = createPaymentSlice.actions;

export default createPaymentSlice.reducer;
