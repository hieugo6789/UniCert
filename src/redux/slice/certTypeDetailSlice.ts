import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentCertType } from "../../models/certType";

export interface certTypeDetail {
  currentType: currentCertType;
  currentUpdateDetail: currentCertType;
  isLoading: boolean;
  error: boolean;
}

const initialState: certTypeDetail = {
  currentType: {} as currentCertType,
  currentUpdateDetail: {} as currentCertType,
  isLoading: false,
  error: false,
};
const TypeDetailSlice = createSlice({
  name: "typeDetail",
  initialState,
  reducers: {
    TypeDetailsStart: (state) => {
      state.isLoading = true;
    },
    TypeDetailSuccess: (state, action: PayloadAction<currentCertType>) => {
      state.isLoading = false;
      state.currentType = action.payload;
      state.error = false;
    },
    TypeDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailTypeStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailTypeSuccess: (
      state,
      action: PayloadAction<currentCertType>
    ) => {
      state.isLoading = false;
      state.currentType = action.payload;
      state.error = false;
    },
    UpdateDetailTypeFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  TypeDetailsStart,
  TypeDetailSuccess,
  TypeDetailFailure,
  UpdateDetailTypeStart,
  UpdateDetailTypeSuccess,
  UpdateDetailTypeFailure,
} = TypeDetailSlice.actions;

export default TypeDetailSlice.reducer;
