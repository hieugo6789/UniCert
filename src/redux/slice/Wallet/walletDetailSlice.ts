import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentWallet } from "../../../models/wallet";

export interface WalletDetailState {
  wallets: { [key: string]: currentWallet };
  isLoading: boolean;
  error: boolean;
}

const initialState: WalletDetailState = {
  wallets: {},
  isLoading: false,
  error: false,
};

const WalletDetailSlice = createSlice({
  name: "walletDetail",
  initialState,
  reducers: {
    WalletDetailsStart: (state) => {
      state.isLoading = true;
    },
    WalletDetailSuccess: (
      state,
      action: PayloadAction<{ userId: string; wallet: currentWallet }>
    ) => {
      const { userId, wallet } = action.payload;
      state.isLoading = false;
      state.wallets[userId] = wallet; // Lưu ví theo userId
      state.error = false;
    },
    WalletDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailWalletStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailWalletSuccess: (
      state,
      action: PayloadAction<{ userId: string; wallet: currentWallet }>
    ) => {
      const { userId, wallet } = action.payload;
      state.isLoading = false;
      state.wallets[userId] = wallet;
      state.error = false;
    },
    UpdateDetailWalletFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  WalletDetailsStart,
  WalletDetailSuccess,
  WalletDetailFailure,
  UpdateDetailWalletStart,
  UpdateDetailWalletSuccess,
  UpdateDetailWalletFailure,
} = WalletDetailSlice.actions;

export default WalletDetailSlice.reducer;
