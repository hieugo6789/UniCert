import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteOrganize } from "../../models/organization";

interface DeleteOrganizationState {
  organize: deleteOrganize;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteOrganizationState = {
  organize: {} as deleteOrganize,
  isDeleting: false,
  deleteError: false,
};

const organizeDeleteState = createSlice({
  name: "organizeDelete",
  initialState,
  reducers: {
    deleteOrganizeStart: (state) => {
      state.isDeleting = true;
    },
    deleteOrganizeSuccess: (state, action: PayloadAction<deleteOrganize>) => {
      state.isDeleting = false;
      state.organize = action.payload;
      state.deleteError = false;
    },
    deleteOrganizeFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const {
  deleteOrganizeStart,
  deleteOrganizeSuccess,
  deleteOrganizeFailure,
} = organizeDeleteState.actions;

export default organizeDeleteState.reducer;
