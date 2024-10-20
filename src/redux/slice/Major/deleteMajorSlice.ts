import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteMajor } from "../../../models/major";

interface DeleteMajorState {
  major: deleteMajor;
  isDeleting: boolean;
  deleteError: boolean;
}

const initialState: DeleteMajorState = {
  major: {} as deleteMajor,
  isDeleting: false,
  deleteError: false,
};

const majorDeleteState = createSlice({
  name: "majorDelete",
  initialState,
  reducers: {
    deleteMajorStart: (state) => {
      state.isDeleting = true;
    },
    deleteMajorSuccess: (state, action: PayloadAction<deleteMajor>) => {
      state.isDeleting = false;
      state.major = action.payload;
      state.deleteError = false;
    },
    deleteMajorFailure: (state) => {
      state.isDeleting = false;
      state.deleteError = true;
    },
  },
});

export const { deleteMajorStart, deleteMajorSuccess, deleteMajorFailure } =
  majorDeleteState.actions;

export default majorDeleteState.reducer;
