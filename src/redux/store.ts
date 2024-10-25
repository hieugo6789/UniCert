// redux store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slice/authSlice";
import majorReducer from "./slice/Major/majorSlice";
import majorDetailReducer from "./slice/Major/majorDetailSlice";
import createMajorReducer from "./slice/Major/createMajorSlice";
import majorDeleteReducer from "./slice/Major/deleteMajorSlice";
import jobReducer from "./slice/JobPosition/jobSlice";
import jobDetailReducer from "./slice/JobPosition/jobDetailSlice";
import createJobReducer from "./slice/JobPosition/createJobSlice";
import jobDeleteReducer from "./slice/JobPosition/deleteJobSlice";
import accountReducer from "./slice/Account/accountSlice";
import organizationReducer from "./slice/Organize/organizationSlice";
import organizeDetailReducer from "./slice/Organize/organizeDetailSlice";
import createOrganizationReducer from "./slice/Organize/createOrganizeSlice";
import deleteOrganizationReducer from "./slice/Organize/deleteOrganizeSlice";
import courseReducer from "./slice/Course/courseSlice";
import courseDetailReducer from "./slice/Course/courseDetailSlice";
import deleteCourseReducer from "./slice/Course/deleteCourseSlice";
import examReducer from "../redux/slice/SimulationExam/examSlice";
import deleteExamReducer from "../redux/slice/SimulationExam/deleteExamSlice";
import voucherReducer from "../redux/slice/Voucher/voucherSlice";
import createVoucherReducer from "../redux/slice/Voucher/createVoucherSlice";
import deleteVoucherReducer from "../redux/slice/Voucher/deleteVoucherSlice";
import certificateReducer from "./slice/Certification/certificateSlice";
import certificateDetailReducer from "./slice/Certification/certDetailSlice";
import deleteCertificateReducer from "./slice/Certification/deleteCertificateSlice";
import createCertificateReducer from "./slice/Certification/createCertSlice";
import certTypeReducer from "./slice/Certification/certTypeSlice";
import certTypeDetailReducer from "./slice/Certification/certTypeDetailSlice";
import scheduleReducer from "./slice/Schedule/scheduleSlice";
import userDetailReducer from "./slice/Account/userDetailSlice";
import deleteAccountReducer from "./slice/Account/deleteAccountSlice";
import profileReducer from "./slice/Profile/profileSlice";
import walletDetailReducer from "./slice/Wallet/walletDetailSlice";
import createTransactionReducer from "./slice/Wallet/createTransactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    major: majorReducer,
    majorDetail: majorDetailReducer,
    createMajor: createMajorReducer,
    majorDelete: majorDeleteReducer,
    job: jobReducer,
    jobDetail: jobDetailReducer,
    createJob: createJobReducer,
    jobDelete: jobDeleteReducer,
    account: accountReducer,
    organization: organizationReducer,
    organizeDetail: organizeDetailReducer,
    createOrganization: createOrganizationReducer,
    deleteOrganization: deleteOrganizationReducer,
    course: courseReducer,
    courseDetail: courseDetailReducer,
    deleteCourse: deleteCourseReducer,
    exam: examReducer,
    deleteExam: deleteExamReducer,
    voucher: voucherReducer,
    createVoucher: createVoucherReducer,
    deleteVoucher: deleteVoucherReducer,
    certificate: certificateReducer,
    certificateDetail: certificateDetailReducer,
    certificateDelete: deleteCertificateReducer,
    createCertificate: createCertificateReducer,
    certType: certTypeReducer,
    certTypeDetail: certTypeDetailReducer,
    schedule: scheduleReducer,
    userDetail: userDetailReducer,
    accountDelete: deleteAccountReducer,
    profile: profileReducer,
    walletDetail: walletDetailReducer,
    createTransaction: createTransactionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
