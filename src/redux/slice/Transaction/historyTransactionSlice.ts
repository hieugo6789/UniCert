import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../../utils/agent";
import { currentTransaction } from "../../../models/transaction";

interface HistoryTransactionState {
  transactions: currentTransaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HistoryTransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};
export const fetchAllHistoryTransaction = createAsyncThunk(
  "admin/fetchAllHistoryTransaction",
  async (userId: number) => {
    try {
      const response = await agent.TransactionWallet.getHistoryTransaction(
        userId
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

const historyTransactionSlice = createSlice({
  name: "historyTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHistoryTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllHistoryTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllHistoryTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch transactions.";
      });
  },
});

export const historyTransactionActions = historyTransactionSlice.actions;
export default historyTransactionSlice.reducer;
