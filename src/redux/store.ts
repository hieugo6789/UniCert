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
import createCourseReducer from "../redux/slice/Course/createCourseSlice";
import deleteCourseReducer from "./slice/Course/deleteCourseSlice";
import examReducer from "../redux/slice/SimulationExam/examSlice";
import examDetailReducer from "./slice/SimulationExam/examDetailSlice";
import createExamReducer from "./slice/SimulationExam/createExamSlice";
import deleteExamReducer from "../redux/slice/SimulationExam/deleteExamSlice";
import createQuestionReducer from "./slice/SimulationExam/Question/createQuestionSlice";
import feedbackReducer from "./slice/Feedback/feedbackSlice";
import feedbackDetailReducer from "./slice/Feedback/feedbackDetailSlice";
import createFeedbackReducer from "./slice/Feedback/createFeedbackSlice";
import deleteFeedbackReducer from "./slice/Feedback/feedbackSlice";
import voucherReducer from "../redux/slice/Voucher/voucherSlice";
import voucherDetailReducer from "./slice/Voucher/voucherDetailSlice";
import createVoucherReducer from "../redux/slice/Voucher/createVoucherSlice";
import deleteVoucherReducer from "../redux/slice/Voucher/deleteVoucherSlice";
import certificateReducer from "./slice/Certification/certificateSlice";
import certificateDetailReducer from "./slice/Certification/certDetailSlice";
import deleteCertificateReducer from "./slice/Certification/deleteCertificateSlice";
import createCertificateReducer from "./slice/Certification/createCertSlice";
import certTypeReducer from "./slice/Certification/certTypeSlice";
import certTypeDetailReducer from "./slice/Certification/certTypeDetailSlice";
import scheduleReducer from "./slice/Schedule/scheduleSlice";
import deleteScheduleReducer from "./slice/Schedule/deleteScheduleSlice";
import userDetailReducer from "./slice/Account/userDetailSlice";
import deleteAccountReducer from "./slice/Account/deleteAccountSlice";
import profileReducer from "./slice/Profile/profileSlice";
import walletDetailReducer from "./slice/Wallet/walletDetailSlice";
import historyTransactionReducer from "./slice/Transaction/historyTransactionSlice";
import createTransactionReducer from "./slice/Wallet/createTransactionSlice";
import cartReducer from "./slice/Cart/CartSlice";
import examEnrollmentReducer from "./slice/Enrollment/ExamSlice";
import createExamEnrollmentReducer from "./slice/Enrollment/createExamEnrollSlice";
import courseEnrollmentReducer from "./slice/Enrollment/CourseSlice";
import createCourseEnrollmentReducer from "./slice/Enrollment/createCourseEnrollSlice";
import examPaymentReducer from "./slice/Payment/examPaymentSlice";
import coursePaymentReducer from "./slice/Payment/coursePaymentSlice";
import createPaymentReducer from "./slice/Payment/createPaymentSlice";

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
    createCourse: createCourseReducer,
    courseDetail: courseDetailReducer,
    deleteCourse: deleteCourseReducer,
    exam: examReducer,
    examDetail: examDetailReducer,
    createExam: createExamReducer,
    deleteExam: deleteExamReducer,
    createQuestion: createQuestionReducer,
    feedback: feedbackReducer,
    feedbackDetail: feedbackDetailReducer,
    createFeedback: createFeedbackReducer,
    deleteFeedback: deleteFeedbackReducer,
    voucher: voucherReducer,
    voucherDetail: voucherDetailReducer,
    createVoucher: createVoucherReducer,
    deleteVoucher: deleteVoucherReducer,
    certificate: certificateReducer,
    certificateDetail: certificateDetailReducer,
    certificateDelete: deleteCertificateReducer,
    createCertificate: createCertificateReducer,
    certType: certTypeReducer,
    certTypeDetail: certTypeDetailReducer,
    schedule: scheduleReducer,
    deleteSchedule: deleteScheduleReducer,
    userDetail: userDetailReducer,
    accountDelete: deleteAccountReducer,
    profile: profileReducer,
    walletDetail: walletDetailReducer,
    historyTransaction: historyTransactionReducer,
    createTransaction: createTransactionReducer,
    cart: cartReducer,
    examEnrollment: examEnrollmentReducer,
    createExamEnrollment: createExamEnrollmentReducer,
    courseEnrollment: courseEnrollmentReducer,
    createCourseEnrollment: createCourseEnrollmentReducer,
    examPayment: examPaymentReducer,
    coursePayment: coursePaymentReducer,
    createPayment: createPaymentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
