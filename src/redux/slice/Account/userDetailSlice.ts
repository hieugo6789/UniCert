import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDetail } from "../../../models/user";

export interface AccountDetail {
  currentUser: UserDetail;
  currentUpdateDetail: UserDetail;
  isLoading: boolean;
  error: boolean;
}

const initialState: AccountDetail = {
  currentUser: {} as UserDetail,
  currentUpdateDetail: {} as UserDetail,
  isLoading: false,
  error: false,
};
const AccountDetailSlice = createSlice({
  name: "accountDetail",
  initialState,
  reducers: {
    UserDetailsStart: (state) => {
      state.isLoading = true;
    },
    UserDetailSuccess: (state, action: PayloadAction<UserDetail>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    UserDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailSuccess: (state, action: PayloadAction<UserDetail>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    UpdateDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  UserDetailsStart,
  UserDetailSuccess,
  UserDetailFailure,
  UpdateDetailStart,
  UpdateDetailSuccess,
  UpdateDetailFailure,
} = AccountDetailSlice.actions;

export default AccountDetailSlice.reducer;
