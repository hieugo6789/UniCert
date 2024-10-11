import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCertificate } from "../../models/certificate";

export interface CertDetail {
  currentCert: currentCertificate;
  currentUpdateDetail: currentCertificate;
  isLoading: boolean;
  error: boolean;
}

const initialState: CertDetail = {
  currentCert: {} as currentCertificate,
  currentUpdateDetail: {} as currentCertificate,
  isLoading: false,
  error: false,
};
const CertDetailSlice = createSlice({
  name: "certDetail",
  initialState,
  reducers: {
    CertDetailsStart: (state) => {
      state.isLoading = true;
    },
    CertDetailSuccess: (state, action: PayloadAction<currentCertificate>) => {
      state.isLoading = false;
      state.currentCert = action.payload;
      state.error = false;
    },
    CertDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailCertStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailCertSuccess: (
      state,
      action: PayloadAction<currentCertificate>
    ) => {
      state.isLoading = false;
      state.currentCert = action.payload;
      state.error = false;
    },
    UpdateDetailCertFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  CertDetailsStart,
  CertDetailSuccess,
  CertDetailFailure,
  UpdateDetailCertStart,
  UpdateDetailCertSuccess,
  UpdateDetailCertFailure,
} = CertDetailSlice.actions;

export default CertDetailSlice.reducer;
