import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChangePasswordInput } from "../../../models/user";

export interface ChangePassword {
  isCreating: boolean;
  currentInput: ChangePasswordInput | null;
  error: boolean;
}

const initialState: ChangePassword = {
  isCreating: false,
  currentInput: null,
  error: false,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    changePasswordStart: (state) => {
      state.isCreating = true;
      state.currentInput = null;
      state.error = false;
    },
    changePasswordSuccess: (
      state,
      action: PayloadAction<ChangePasswordInput>
    ) => {
      state.isCreating = false;
      state.currentInput = action.payload;
      state.error = false;
    },
    changePasswordFailure: (state) => {
      state.isCreating = false;
      state.currentInput = null;
      state.error = true;
    },
  },
});

export const {
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailure,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
