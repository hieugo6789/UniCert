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
import studentListReducer from "./slice/Course/studentListSlice";
import examReducer from "../redux/slice/SimulationExam/examSlice";
import examDetailReducer from "./slice/SimulationExam/examDetailSlice";
import createExamReducer from "./slice/SimulationExam/createExamSlice";
import deleteExamReducer from "../redux/slice/SimulationExam/deleteExamSlice";
import questionDetailReducer from "./slice/SimulationExam/Question/questionDetailSlice";
import createQuestionReducer from "./slice/SimulationExam/Question/createQuestionSlice";
import deleteQuestionReducer from "./slice/SimulationExam/Question/deleteQuestionSlice";
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
import deleteExamEnrollmentReducer from "./slice/Enrollment/deleteExamEnrollSlice";
import courseEnrollmentReducer from "./slice/Enrollment/CourseSlice";
import createCourseEnrollmentReducer from "./slice/Enrollment/createCourseEnrollSlice";
import deleteCourseEnrollmentReducer from "./slice/Enrollment/deleteCourseEnrollSlice";
import examPaymentReducer from "./slice/Payment/examPaymentSlice";
import coursePaymentReducer from "./slice/Payment/coursePaymentSlice";
import createPaymentReducer from "./slice/Payment/createPaymentSlice";
import payNowReducer from "./slice/Payment/payNowSlice";
import createScoreReducer from "./slice/Score/createScore";
import scheduleDetailReducer from "./slice/Schedule/scheduleDetailSlice";
import createScheduleReducer from "./slice/Schedule/createSchedule";
import scoreReducer from "./slice/Score/scoreByUserAndExam";
import dashboardReducer from "./slice/Dashboard/DashboardSlice";
import notificationReducer from "./slice/Notification/notificationSlice";
import changePasswordReducer from "./slice/Password/ChangePasswordSlice";
import resetPasswordReducer from "./slice/Password/ResetPasswordSlice";
import forgotPasswordReducer from "./slice/Password/ForgotPasswordSlice";

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
    studentList: studentListReducer,
    exam: examReducer,
    examDetail: examDetailReducer,
    createExam: createExamReducer,
    deleteExam: deleteExamReducer,
    questionDetail: questionDetailReducer,
    createQuestion: createQuestionReducer,
    deleteQuestion: deleteQuestionReducer,
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
    deleteExamEnrollment: deleteExamEnrollmentReducer,
    courseEnrollment: courseEnrollmentReducer,
    createCourseEnrollment: createCourseEnrollmentReducer,
    deleteCourseEnrollment: deleteCourseEnrollmentReducer,
    examPayment: examPaymentReducer,
    coursePayment: coursePaymentReducer,
    createPayment: createPaymentReducer,
    payNow: payNowReducer,
    createScore: createScoreReducer,
    scheduleDetail: scheduleDetailReducer,
    createSchedule: createScheduleReducer,
    score: scoreReducer,
    dashboard: dashboardReducer,
    notification: notificationReducer,
    changePassword: changePasswordReducer,
    resetPassword: resetPasswordReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
