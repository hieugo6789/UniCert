import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentOrganization } from "../../models/organization";

export interface CreateOrganizeState {
  isCreating: boolean;
  createdOrganize: currentOrganization | null;
  error: boolean;
}

const initialState: CreateOrganizeState = {
  isCreating: false,
  createdOrganize: null,
  error: false,
};

const createOrganizeSlice = createSlice({
  name: "createOrganize",
  initialState,
  reducers: {
    createOrganizeStart: (state) => {
      state.isCreating = true;
      state.createdOrganize = null;
      state.error = false;
    },
    createOrganizeSuccess: (
      state,
      action: PayloadAction<currentOrganization>
    ) => {
      state.isCreating = false;
      state.createdOrganize = action.payload;
      state.error = false;
    },
    createOrganizeFailure: (state) => {
      state.isCreating = false;
      state.createdOrganize = null;
      state.error = true;
    },
  },
});

export const {
  createOrganizeStart,
  createOrganizeSuccess,
  createOrganizeFailure,
} = createOrganizeSlice.actions;

export default createOrganizeSlice.reducer;
