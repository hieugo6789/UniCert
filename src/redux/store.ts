// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import majorReducer from "../redux/slice/majorSlice";
import jobReducer from "../redux/slice/jobSlice";
import accountReducer from "../redux/slice/accountSlice";
import organizationReducer from "../redux/slice/organizationSlice";
import createOrganizationReducer from "../redux/slice/createOrganizeSlice";
import courseReducer from "../redux/slice/courseSlice";
import certificateReducer from "../redux/slice/certificateSlice";
import certificateDetailReducer from "../redux/slice/certDetailSlice";
import deleteCertificateReducer from "./slice/deleteCertificateSlice";
import scheduleReducer from "./slice/scheduleSlice";
import userDetailReducer from "../redux/slice/userDetailSlice";
import deleteAccountReducer from "../redux/slice/deleteAccountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    major: majorReducer,
    job: jobReducer,
    account: accountReducer,
    organization: organizationReducer,
    createOrganization: createOrganizationReducer,
    course: courseReducer,
    certificate: certificateReducer,
    certificateDetail: certificateDetailReducer,
    certificateDelete: deleteCertificateReducer,
    schedule: scheduleReducer,
    userDetail: userDetailReducer,
    accountDelete: deleteAccountReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
