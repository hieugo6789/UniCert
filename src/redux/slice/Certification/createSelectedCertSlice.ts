import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCertProps } from "../../../models/certificate";

export interface CreateCertState {
  isCreating: boolean;
  createdCert: createCertProps | null;
  error: boolean;
}

const initialState: CreateCertState = {
  isCreating: false,
  createdCert: null,
  error: false,
};

const createCertSlice = createSlice({
  name: "createSelectedCert",
  initialState,
  reducers: {
    createCertStart: (state) => {
      state.isCreating = true;
      state.createdCert = null;
      state.error = false;
    },
    createCertSuccess: (state, action: PayloadAction<createCertProps>) => {
      state.isCreating = false;
      state.createdCert = action.payload;
      state.error = false;
    },
    createCertFailure: (state) => {
      state.isCreating = false;
      state.createdCert = null;
      state.error = true;
    },
  },
});

export const { createCertStart, createCertSuccess, createCertFailure } =
  createCertSlice.actions;

export default createCertSlice.reducer;
