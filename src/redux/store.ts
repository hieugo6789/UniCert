// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import majorReducer from "../redux/slice/majorSlice";
import accountReducer from "../redux/slice/accountSlice";
import organizationReducer from "../redux/slice/organizationSlice";
import createOrganizationReducer from "../redux/slice/createOrganizeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    major: majorReducer,
    account: accountReducer,
    organization: organizationReducer,
    createOrganization: createOrganizationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
