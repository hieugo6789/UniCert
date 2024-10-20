import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../../utils/agent";
import { AxiosError } from "axios";

export interface Account {
  userId: string;
  username: string;
  password: string;
  email: string;
  fullname: string;
  dob: Date;
  address: string;
  phoneNumber: number;
  role: string;
  status: boolean;
  userCreatedAt: Date;
  userImage: string;
}

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  isLoading: false,
  error: null,
};

export const fetchAllAccount = createAsyncThunk(
  "admin/fetchAllAccount",
  async () => {
    try {
      const response = await agent.Account.getAllAccount();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.error.message,
          status: error.response?.status,
        };
      }
    }
  }
);
const accountSlice = createSlice({
  name: "major",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAllAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch majors.";
      });
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
