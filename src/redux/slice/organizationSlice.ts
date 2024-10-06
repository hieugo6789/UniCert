import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import agent from "../../utils/agent";
import { currentOrganization } from "../../models/organization";

interface OrganizationState {
  organizations: currentOrganization[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organizations: [],
  isLoading: false,
  error: null,
};
export const fetchAllOrganizationPagination = createAsyncThunk(
  "admin/fetchAllOrganizationPagination",
  async (name?: string) => {
    try {
      const response = await agent.Organization.getAllOrganizations(name);
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

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrganizationPagination.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllOrganizationPagination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizations = action.payload;
      })
      .addCase(fetchAllOrganizationPagination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch organizations.";
      });
  },
});

export const majorActions = organizationSlice.actions;
export default organizationSlice.reducer;
