// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import majorReducer from "../redux/slice/majorSlice";
import majorDetailReducer from "../redux/slice/majorDetailSlice";
import majorDeleteReducer from "../redux/slice/deleteMajorSlice";
import jobReducer from "../redux/slice/jobSlice";
import jobDetailReducer from "../redux/slice/jobDetailSlice";
import jobDeleteReducer from "../redux/slice/deleteJobSlice";
import accountReducer from "../redux/slice/accountSlice";
import organizationReducer from "../redux/slice/organizationSlice";
import organizeDetailReducer from "../redux/slice/organizeDetailSlice";
import createOrganizationReducer from "../redux/slice/createOrganizeSlice";
import courseReducer from "../redux/slice/courseSlice";
import certificateReducer from "../redux/slice/certificateSlice";
import certificateDetailReducer from "../redux/slice/certDetailSlice";
import deleteCertificateReducer from "./slice/deleteCertificateSlice";
import scheduleReducer from "./slice/scheduleSlice";
import userDetailReducer from "../redux/slice/userDetailSlice";
import deleteAccountReducer from "../redux/slice/deleteAccountSlice";
import profileReducer from "../redux/slice/profileSlice";
import walletDetailReducer from "../redux/slice/walletDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    major: majorReducer,
    majorDetail: majorDetailReducer,
    majorDelete: majorDeleteReducer,
    job: jobReducer,
    jobDetail: jobDetailReducer,
    jobDelete: jobDeleteReducer,
    account: accountReducer,
    organization: organizationReducer,
    organizeDetail: organizeDetailReducer,
    createOrganization: createOrganizationReducer,
    course: courseReducer,
    certificate: certificateReducer,
    certificateDetail: certificateDetailReducer,
    certificateDelete: deleteCertificateReducer,
    schedule: scheduleReducer,
    userDetail: userDetailReducer,
    accountDelete: deleteAccountReducer,
    profile: profileReducer,
    walletDetail: walletDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
