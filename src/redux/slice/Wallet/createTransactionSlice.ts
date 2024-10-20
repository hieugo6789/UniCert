import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentTransaction } from "../../../models/transaction";

export interface CreateTransactionState {
  isCreating: boolean;
  createdTransaction: currentTransaction | null;
  error: boolean;
}

const initialState: CreateTransactionState = {
  isCreating: false,
  createdTransaction: null,
  error: false,
};

const createTransactionSlice = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    createTransactionStart: (state) => {
      state.isCreating = true;
      state.createdTransaction = null;
      state.error = false;
    },
    createTransactionSuccess: (
      state,
      action: PayloadAction<currentTransaction>
    ) => {
      state.isCreating = false;
      state.createdTransaction = action.payload;
      state.error = false;
    },
    createTransactionFailure: (state) => {
      state.isCreating = false;
      state.createdTransaction = null;
      state.error = true;
    },
  },
});

export const {
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure,
} = createTransactionSlice.actions;

export default createTransactionSlice.reducer;
