import { AxiosResponse } from "axios";
import apiJWT from "./api";
import baseApi from "./baseApi";
import { MajorInput, UpdateMajor } from "../models/major";
import {
  createOrganizationModel,
  updateOrganize,
} from "../models/organization";
import {
  ChangePasswordInput,
  resetPasswordInput,
  UpdateRole,
} from "../models/user";
import { scheduleInput, updateSchedule } from "../models/schedule";
import {
  createCertificate,
  createCertProps,
  updateCert,
} from "../models/certificate";
import { createJobInput, updateJobInput } from "../models/jobPosition";
import { inputTransaction } from "../models/transaction";
import { createCourse, updateCourse } from "../models/course";
import { createVoucher, updateVoucher } from "../models/voucher";
import { createPayment, payNow } from "../models/payment";
import { updateCart } from "../models/cart";
import {
  createCourseEnrollment,
  createExamEnrollment,
} from "../models/enrollment";
import {
  createExam,
  updateExam,
} from "../models/SimulationExam/simulationExam";
import { createFeedback, updateFeedback } from "../models/feedback";
import {
  createQuestion,
  updateQuestion,
} from "../models/SimulationExam/question";
import { createScore } from "../models/score";
import { CreateEmployeeAccount } from "../models/authentication";

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  post1: <T>(url: string, params?: T) =>
    apiJWT.post(url, { params }).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  put1: <T>(url: string, params?: T) =>
    apiJWT.put(url, { params }).then(responseBody),
  patch: <T>(url: string, body: T) =>
    apiJWT.patch(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, { params }).then(responseBody),
  baseApiGet: <T>(url: string, params?: T) =>
    baseApi.get(url, { params }).then(responseBody),
  baseApiPost: <T>(url: string, body: T) =>
    baseApi.post(url, body).then(responseBody),
  baseApiChangePost: <T>(url: string, body: T, params?: T) =>
    baseApi.post(url, body, { params }).then(responseBody),
  baseApiPut: <T>(url: string, body: T) =>
    baseApi.put(url, body).then(responseBody),
  baseApiPatch: <T>(url: string, body: T) =>
    baseApi.patch(url, body).then(responseBody),
  baseApiDelete: <T>(url: string, params?: T) =>
    baseApi.delete(url, { params }).then(responseBody),
};

const Major = {
  getAllMajors: (name?: string) =>
    requests.get(`api/v1/Major/${name ? name : ""}`),
  getDetailMajor: (majorId: string | undefined) =>
    requests.get(`/api/v1/major/${majorId}`),
  createMajor: (input: MajorInput) => requests.post("api/v1/Major", input),
  deleteMajor: (majorId: string) => requests.del(`/api/v1/major/${majorId}`),
  updateMajor: (majorId: string, input: UpdateMajor) =>
    requests.put(`/api/v1/major/${majorId}`, input),
  updateMajorPermission: (majorId: number, permission: number) =>
    requests.put1(
      `api/v1/major/Permission?majorId=${majorId}&majorPermission=${permission}`
    ),
  filterMajor: (majorId: string, jobId: string) =>
    requests.get(`api/v1/major/${majorId}/jobPosition/${jobId}`),
};
const Organization = {
  getAllOrganizations: (name?: string) =>
    requests.get(`api/v1/organize/${name ? name : ""}`),
  getOrganizationDetail: (organizeId: string | undefined) =>
    requests.get(`api/v1/organize/${organizeId}`),
  createOrganize: (input: createOrganizationModel) =>
    requests.post("/api/v1/organize", input),
  deleteOrganize: (organizeId: string) =>
    requests.del(`api/v1/organize/${organizeId}`),
  updateOrganization: (organizeId: string, input: updateOrganize) =>
    requests.put(`api/v1/organize/${organizeId}`, input),
  updateOrganizePermission: (organizeId: number, permission: number) =>
    requests.put1(
      `api/v1/organize/Permission?organizeId=${organizeId}&organizePermission=${permission}`
    ),
};

const JobPosition = {
  getAllJob: (name?: string) =>
    requests.get(`api/v1/job-position/${name ? name : ""}`),
  getJobDetail: (jobId: string | undefined) =>
    requests.get(`api/v1/job-position/${jobId}`),
  createJobPosition: (input: createJobInput) =>
    requests.post(`api/v1/job-position`, input),
  deleteJob: (jobId: string) => requests.del(`api/v1/job-position/${jobId}`),
  updateJobDetail: (jobId: string, input: updateJobInput) =>
    requests.put(`api/v1/job-position/${jobId}`, input),
  getJobFilterByOrganization: (jobId: number, organizeId?: number) => {
    return organizeId === undefined
      ? requests.get(`api/v1/job-position/${jobId}/organize`)
      : requests.get(
          `api/v1/job-position/${jobId}/organize?organizeId=${organizeId}`
        );
  },
  updateJobPermission: (jobId: number, permission: number) =>
    requests.put1(
      `api/v1/job-position/Permission?jobPositionId=${jobId}&jobPositionPermission=${permission}`
    ),
  getRecommedByUser: (userId: string) =>
    requests.get(`/api/v1/job-position/recommended/${userId}`),
};

const Certificate = {
  getAllCertifications: () => requests.get("api/v1/certification"),
  getAllCertificates: (
    name?: string,
    pageNumber?: number,
    pageSize?: number,
    permission?: number
  ) =>
    requests.get(
      `api/v1/certification/search${name ? `?certName=${name}` : ""}${
        pageNumber ? `${name ? "&" : "?"}pageNumber=${pageNumber}` : ""
      }${pageSize ? `&pageSize=${pageSize}` : ""}${
        permission ? `&permission=${permission}` : ""
      }`
    ),
  getCertificateDetail: (certId: number | undefined) =>
    requests.get(`api/v1/certification/${certId}`),
  getTopCertification: (topN: number) =>
    requests.get(`/api/v1/top-search/${topN}`),
  createCertificate: (input: createCertificate) =>
    requests.post("/api/v1/certification", input),
  deleteCertificate: (certId: number) =>
    requests.del(`api/v1/certification/${certId}`),
  updateCertificate: (certId: number, input: updateCert) =>
    requests.put(`api/v1/certification/${certId}`, input),
  updateCertPermission: (certId: number, permission: number) =>
    requests.put1(
      `api/v1/certification/update-permission/${certId}?permission=${permission}`
    ),
  getTotalCertCost: (input: number[]) =>
    requests.post(`api/v1/certification/total-cert-cost`, input),
};

const Schedule = {
  getAllSchedule: (name?: string) =>
    requests.get(`api/v1/exam-session/${name ? name : ""}`),
  getScheduleDay: (dateInput: string) =>
    requests.get(`api/v1/exam-session/${dateInput}`),
  createSchedule: (input: scheduleInput) =>
    requests.post("api/v1/exam-session", input),
  deleteSchedule: (sessionId: number) =>
    requests.del(`api/v1/exam-session/${sessionId}`),
  getScheduleDetail: (sessionId: number) =>
    requests.get(`api/v1/exam-session/${sessionId}`),
  updateScheduleDetail: (sessionId: number, data: updateSchedule) =>
    requests.put(`api/v1/exam-session/${sessionId}`, data),
};

const Account = {
  getAllAccount: () => requests.get("api/v1/Users"),
  getAccountDetail: (userId: string) => requests.get(`api/v1/users/${userId}`),
  updateAccountInformation: (input: UpdateRole, userId: string) =>
    requests.put(`/api/v1/users/${userId}`, input),
  deleteAccount: (userId: string) => requests.del(`api/v1/users/${userId}`),
  getAccountWallet: (userId: string | undefined) =>
    requests.get(`api/v1/wallet/${userId}`),
};
const TransactionWallet = {
  getTransactionDetail: (transactionId: number) =>
    requests.get(`api/v1/transaction${transactionId}`),
  createTransaction: (input: inputTransaction) =>
    requests.post("api/v1/transaction", input),
  getHistoryTransaction: (userId: number) =>
    requests.get(`api/v1/transaction/get-by-user/${userId}`),
  getAllTransaction: () => requests.get("api/v1/transaction"),
};
const Checkout = {
  getCheckOut: (transactionId: number) =>
    requests.post1(`api/v1/checkout/${transactionId}`),
  getUpdateWalletAfterCheckout: (userId: string, transId: number | null) => {
    const url =
      transId !== null
        ? `api/v1/wallet/${userId}?transId=${transId}`
        : `api/v1/wallet/${userId}`;

    return requests.get(url);
  },
};
const InternalCourse = {
  getAllCourse: (name?: string) =>
    requests.get(`api/v1/course/${name ? name : ""}`),
  getCourseDetail: (courseId: string) =>
    requests.get(`api/v1/course/${courseId}`),
  createCourse: (input: createCourse) => requests.post(`api/v1/course`, input),
  deleteCourse: (courseId: string) => requests.del(`api/v1/course/${courseId}`),
  updateCourse: (courseId: string, input: updateCourse) =>
    requests.put(`api/v1/course/${courseId}`, input),
  updateCoursePermission: (courseId: number, permission: number) =>
    requests.put1(
      `api/v1/course/Permission?courseId=${courseId}&coursePermission=${permission}`
    ),
  studentList: (courseId: number) =>
    requests.get(`api/v1/course-enrollment/list_student_enroll/${courseId}`),
  checkStudent: (enrollCode: number) =>
    requests.get(`api/v1/course-enrollment/check_student_enroll/${enrollCode}`),
};

const SimulationExam = {
  getAllSimulationExam: (name?: string) =>
    requests.get(
      `api/v1/simulation-exam/search${name ? `/?examName=${name}` : ""}`
    ),
  getSimulationExamCertId: (certId: number) =>
    requests.get(`api/v1/simulation-exam/get-by-certId/${certId}`),
  getSimulationExamDetail: (examId: number) =>
    requests.get(`api/v1/simulation-exam/${examId}`),
  createSimulationExam: (input: createExam) =>
    requests.post(`api/v1/simulation-exam`, input),
  deleteSimulationExam: (examId: number) =>
    requests.del(`api/v1/simulation-exam/${examId}`),
  updateSimulationExam: (examId: number, data: updateExam) =>
    requests.put(`api/v1/simulation-exam/${examId}`, data),
  updateExamPermission: (examId: number, permission: number) =>
    requests.put1(
      `api/v1/simulation-exam/update-permission/${examId}?permission=${permission}`
    ),
};
const Question = {
  questionDetail: (questionId: number) =>
    requests.get(`api/v1/question/${questionId}`),
  createQuestion: (input: createQuestion) =>
    requests.post(`api/v1/question`, input),
  deleteQuestion: (questionId: number) =>
    requests.del(`api/v1/question/${questionId}`),
  updateQuestion: (questionId: number, data: updateQuestion) =>
    requests.put(`api/v1/question/${questionId}`, data),
};

const FeedBack = {
  getAllFeedback: () => requests.get("api/v1/feedback"),
  getFeedbackByExamId: (examId: number) =>
    requests.get(`api/v1/feedback/exam/${examId}`),
  getFeedbackDetail: (feedbackId: number) =>
    requests.get(`api/v1/feedback/exam/${feedbackId}`),
  getFeedbackByCertId: (certId: number) =>
    requests.get(`api/v1/feedback/cert/${certId}`),
  createFeedback: (input: createFeedback) =>
    requests.post("api/v1/feedback", input),
  deleteFeedback: (feedbackId: number) =>
    requests.del(`api/v1/feedback/${feedbackId}`),
  updateFeedback: (feedbackId: number, input: updateFeedback) =>
    requests.put(`api/v1/feedback/${feedbackId}`, input),
};

const Voucher = {
  getAllVoucher: (name?: string) =>
    requests.get(`api/v1/voucher/${name ? name : ""}`),
  getDetailVoucher: (voucherId: number) =>
    requests.get(`api/v1/voucher/${voucherId}`),
  createVoucher: (input: createVoucher) =>
    requests.post(`api/v1/voucher`, input),
  deleteVoucher: (voucherId: number) =>
    requests.del(`api/v1/voucher/${voucherId}`),
  updateVoucher: (voucherId: number, input: updateVoucher) =>
    requests.put(`api/v1/voucher/${voucherId}`, input),
};

const Profile = {
  getProfile: (userId: string | undefined) =>
    requests.get(`api/v1/profile/${userId}`),
};

const CertType = {
  getCertType: () => requests.get("api/v1/cert-type"),
  getCertTypeDetail: (typeId: string) =>
    requests.get(`api/v1/cert-type/${typeId}`),
};

const Cart = {
  getCartByUserId: (userId: string) => requests.get(`api/v1/cart/${userId}`),
  updateCart: (userId: string, input: updateCart) =>
    requests.put(`api/v1/cart/${userId}`, input),
};

const Enrollment = {
  getCourseByUserId: (userId: string) =>
    requests.get(`api/v1/course-enrollment/user/${userId}`),
  getCourseEnrollDetail: (courseEnrollmentId: number) =>
    requests.get(`api/v1/course-enrollment/${courseEnrollmentId}`),
  createCourseEnroll: (input: createCourseEnrollment) =>
    requests.post("api/v1/course-enrollment", input),
  deleteCourseEnrollment: (cEnrollmentId: number) =>
    requests.del(`api/v1/course-enrollment//${cEnrollmentId}`),
  getExamByUserId: (userId: string) =>
    requests.get(`api/v1/exam-enrollment/get-by-userId/${userId}`),
  createExamEnroll: (input: createExamEnrollment) =>
    requests.post("api/v1/exam-enrollment", input),
  deleteExamEnrollment: (eEnrollmentId: number) =>
    requests.del(`api/v1/exam-enrollment/${eEnrollmentId}`),
};

const Payment = {
  createPayment: (input: createPayment) =>
    requests.post(`api/v1/payment`, input),
  examPayment: (userId: string) =>
    requests.get(`api/v1/payment/get-ExamEnrollment-by-userId/${userId}`),
  coursePayment: (userId: string) =>
    requests.get(`api/v1/payment/get-CourseEnrollment-by-userId/${userId}`),
  payNow: (input: payNow) => requests.post("api/v1/payment/pay-now", input),
};

const Score = {
  submitScore: (input: createScore) => requests.post(`api/v1/score`, input),
  getCoreByUserAndExam: (userId: number, examId: number) =>
    requests.get(`api/v1/score/${userId}?examId=${examId}`),
};
const Dashboard = {
  getSummary: () => requests.get("api/v1/dashboard/summary"),
  getYearRevenue: (year: number) =>
    requests.get(`api/v1/dashboard/monthly-revenue/${year}`),
  getMonthRevenue: (year: number, month: number) =>
    requests.get(`api/v1/dashboard/weekly-revenue/${year}/${month}`),
};
const Notification = {
  getNotification: (role: string) =>
    requests.get(`api/v1/notification/${role}`),
  updateIsRead: (role: string) =>
    requests.put1(`api/v1/notification/IsRead?role=${role}`),
  updateIsReadViolation: (notificationId: number) =>
    requests.put1(`api/v1/notification/RecordViolations/${notificationId}`),
  readNotification: (notificationId: number) =>
    requests.put1(
      `api/v1/notification/IsReadByNotificationId/${notificationId}`
    ),
  deleteNotification: (notificationId: number) =>
    requests.del(`api/v1/notification/${notificationId}`),
  getUserNotification: (userId: number) =>
    requests.get(`api/v1/notification/Student/${userId}`),
};
const ChangePassword = {
  changePassword: (input: ChangePasswordInput, userId: string) =>
    requests.post(`api/v1/forget-password/change-password/${userId}`, input),
};
const resetPassword = {
  forgotPassword: (input: { email: string }) =>
    requests.post(`api/v1/forget-password/forget-password`, input),
  resetPassword: (input: resetPasswordInput) =>
    requests.post(`api/v1/forget-password/reset-password`, input),
};
const Employees = {
  createEmployeeAccount: (input: CreateEmployeeAccount) =>
    requests.post("api/v1/users", input),
};
const selectedCert = {
  getByUser(userId: string) {
    return requests.get(`api/v1/selected-cert/user/${userId}/certs`);
  },
  createSelectedCert(input: createCertProps) {
    return requests.post(`api/v1/selected-cert/user/certs`, input);
  },
  deleteSelectedCert(userId: number, certId: number) {
    return requests.del(`api/v1/selected-cert/user/${userId}/certs/${certId}`);
  },
  UpdateSelectedCert(input: createCertProps) {
    return requests.put(`api/v1/selected-cert/user/certs`, input);
  },
};
const agent = {
  Major,
  Account,
  Organization,
  InternalCourse,
  Certificate,
  JobPosition,
  Schedule,
  Profile,
  SimulationExam,
  Question,
  FeedBack,
  Voucher,
  TransactionWallet,
  Checkout,
  CertType,
  Cart,
  Payment,
  Enrollment,
  Score,
  Dashboard,
  Notification,
  ChangePassword,
  resetPassword,
  Employees,
  selectedCert,
};
export default agent;
