import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentMajor } from "../../models/major";

export interface MajorDetail {
  currentMajor: currentMajor;
  currentUpdateMajor: currentMajor;
  isLoading: boolean;
  error: boolean;
}

const initialState: MajorDetail = {
  currentMajor: {} as currentMajor,
  currentUpdateMajor: {} as currentMajor,
  isLoading: false,
  error: false,
};
const MajorDetailSlice = createSlice({
  name: "majorDetail",
  initialState,
  reducers: {
    MajorDetailsStart: (state) => {
      state.isLoading = true;
    },
    MajorDetailSuccess: (state, action: PayloadAction<currentMajor>) => {
      state.isLoading = false;
      state.currentMajor = action.payload;
      state.error = false;
    },
    MajorDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailMajorStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailMajorSuccess: (state, action: PayloadAction<currentMajor>) => {
      state.isLoading = false;
      state.currentMajor = action.payload;
      state.error = false;
    },
    UpdateDetailMajorFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  MajorDetailsStart,
  MajorDetailSuccess,
  MajorDetailFailure,
  UpdateDetailMajorStart,
  UpdateDetailMajorSuccess,
  UpdateDetailMajorFailure,
} = MajorDetailSlice.actions;

export default MajorDetailSlice.reducer;
