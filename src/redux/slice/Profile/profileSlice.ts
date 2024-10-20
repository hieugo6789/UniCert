import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Profile } from "../../../models/user";

interface ProfileState {
  profile: Profile;
  isLoading: boolean;
  error: boolean;
}
const initialState: ProfileState = {
  profile: {} as Profile,
  isLoading: false,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    UserDetailsStart: (state) => {
      state.isLoading = true;
    },
    UserDetailSuccess: (state, action: PayloadAction<Profile>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = false;
    },
    UserDetailFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { UserDetailsStart, UserDetailSuccess, UserDetailFailure } =
  profileSlice.actions;

export default profileSlice.reducer;
