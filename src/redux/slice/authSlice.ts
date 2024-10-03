import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrentUser {
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: string;
  address: string;
  phoneNumber: string;
  role: string;
}

export interface User {
  currentUser: CurrentUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: User = {
  currentUser: {} as CurrentUser,
  isFetching: false,
  error: false,
  displayError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    signUpStart: (state) => {
      state.isFetching = true;
    },
    signUpSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} = authSlice.actions;

export default authSlice.reducer;
