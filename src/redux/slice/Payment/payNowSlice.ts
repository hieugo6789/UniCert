import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentPayment } from "../../../models/payment";

export interface PayNowState {
  isPaying: boolean;
  payed: currentPayment | null;
  error: boolean;
}

const initialState: PayNowState = {
  isPaying: false,
  payed: null,
  error: false,
};

const payNowSlice = createSlice({
  name: "payNow",
  initialState,
  reducers: {
    payNowStart: (state) => {
      state.isPaying = true;
      state.payed = null;
      state.error = false;
    },
    payNowSuccess: (state, action: PayloadAction<currentPayment>) => {
      state.isPaying = false;
      state.payed = action.payload;
      state.error = false;
    },
    payNowFailure: (state) => {
      state.isPaying = false;
      state.payed = null;
      state.error = true;
    },
  },
});

export const { payNowStart, payNowSuccess, payNowFailure } =
  payNowSlice.actions;

export default payNowSlice.reducer;
