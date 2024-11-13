import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { resetPasswordInput } from "../../../models/user";

export interface ResetPassword {
  isCreating: boolean;
  currentInput: resetPasswordInput | null;
  error: boolean;
}

const initialState: ResetPassword = {
  isCreating: false,
  currentInput: null,
  error: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPasswordStart: (state) => {
      state.isCreating = true;
      state.currentInput = null;
      state.error = false;
    },
    resetPasswordSuccess: (
      state,
      action: PayloadAction<resetPasswordInput>
    ) => {
      state.isCreating = false;
      state.currentInput = action.payload;
      state.error = false;
    },
    resetPasswordFailure: (state) => {
      state.isCreating = false;
      state.currentInput = null;
      state.error = true;
    },
  },
});

export const {
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailure
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
