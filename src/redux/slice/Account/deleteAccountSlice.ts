import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetail } from "../../../models/user";

interface DeleteAccountState {
  account: UserDetail;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteAccountState = {
  account: {} as UserDetail,
  isDeleting: false,
  deleteError: false,
};

const accountDeleteState = createSlice({
  name: "accountDelete",
  initialState,
  reducers: {
    deleteAccountStart: (state) => {
      state.isDeleting = true;
    },
    deleteAccountSuccess: (state, action: PayloadAction<UserDetail>) => {
      state.isDeleting = false;
      state.account = action.payload;
      state.deleteError = false;
    },
    deleteAccountFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
} = accountDeleteState.actions;

export default accountDeleteState.reducer;
