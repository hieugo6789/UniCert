import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccountCreated } from "../../../models/authentication";

export interface CreateAccountState {
  isCreating: boolean;
  createdAccount: AccountCreated | null;
  error: boolean;
}

const initialState: CreateAccountState = {
  isCreating: false,
  createdAccount: null,
  error: false,
};

const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {
    createAccountStart: (state) => {
      state.isCreating = true;
      state.createdAccount = null;
      state.error = false;
    },
    createAccountSuccess: (state, action: PayloadAction<AccountCreated>) => {
      state.isCreating = false;
      state.createdAccount = action.payload;
      state.error = false;
    },
    createAccountFailure: (state) => {
      state.isCreating = false;
      state.createdAccount = null;
      state.error = true;
    },
  },
});

export const {
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
} = createAccountSlice.actions;

export default createAccountSlice.reducer;
