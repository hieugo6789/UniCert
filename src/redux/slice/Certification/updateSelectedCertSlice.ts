import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface updateCert {
    userId:number;
    certificateId:number[];
}

export interface CreateCertState {
  isCreating: boolean;
  createdCert: updateCert | null;
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
    updateCertStart: (state) => {
      state.isCreating = true;
      state.createdCert = null;
      state.error = false;
    },
    updateCertSuccess: (state, action: PayloadAction<updateCert>) => {
      state.isCreating = false;
      state.createdCert = action.payload;
      state.error = false;
    },
    updateCertFailure: (state) => {
      state.isCreating = false;
      state.createdCert = null;
      state.error = true;
    },
  },
});

export const { updateCertFailure,updateCertStart,updateCertSuccess } =
  createCertSlice.actions;

export default createCertSlice.reducer;
