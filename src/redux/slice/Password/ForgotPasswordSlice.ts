import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ForgotPassword {
  isCreating: boolean;
  currentInput: {email:string} | null;
  error: boolean;
}

const initialState: ForgotPassword = {
  isCreating: false,
  currentInput: null,
  error: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.isCreating = true;
      state.currentInput = null;
      state.error = false;
    },
    forgotPasswordSuccess: (
      state,
      action: PayloadAction<{email:string}>
    ) => {
      state.isCreating = false;
      state.currentInput = action.payload;
      state.error = false;
    },
    forgotPasswordFailure: (state) => {
      state.isCreating = false;
      state.currentInput = null;
      state.error = true;
    },
  },
});

export const {
    forgotPasswordStart,
    forgotPasswordSuccess,
    forgotPasswordFailure
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
