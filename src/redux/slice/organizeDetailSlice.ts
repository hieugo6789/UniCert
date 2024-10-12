import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentOrganization } from "../../models/organization";

export interface OrganizeDetail {
  currentOrganize: currentOrganization;
  currentUpdateDetail: currentOrganization;
  isLoading: boolean;
  error: boolean;
}

const initialState: OrganizeDetail = {
  currentOrganize: {} as currentOrganization,
  currentUpdateDetail: {} as currentOrganization,
  isLoading: false,
  error: false,
};
const OrganizeDetailSlice = createSlice({
  name: "organizeDetail",
  initialState,
  reducers: {
    OrganizeDetailsStart: (state) => {
      state.isLoading = true;
    },
    OrganizeDetailSuccess: (
      state,
      action: PayloadAction<currentOrganization>
    ) => {
      state.isLoading = false;
      state.currentOrganize = action.payload;
      state.error = false;
    },
    OrganizeDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    UpdateDetailOrganizeStart: (state) => {
      state.isLoading = true;
    },
    UpdateDetailOrganizeSuccess: (
      state,
      action: PayloadAction<currentOrganization>
    ) => {
      state.isLoading = false;
      state.currentOrganize = action.payload;
      state.error = false;
    },
    UpdateDetailOrganizeFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  OrganizeDetailsStart,
  OrganizeDetailSuccess,
  OrganizeDetailFailure,
  UpdateDetailOrganizeStart,
  UpdateDetailOrganizeSuccess,
  UpdateDetailOrganizeFailure,
} = OrganizeDetailSlice.actions;

export default OrganizeDetailSlice.reducer;
