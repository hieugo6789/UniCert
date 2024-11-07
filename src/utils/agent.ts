import { AxiosResponse } from "axios";
import apiJWT from "./api";
import baseApi from "./baseApi";
import { MajorInput, UpdateMajor } from "../models/major";
import {
  createOrganizationModel,
  updateOrganize,
} from "../models/organization";
import { UpdateRole } from "../models/user";
import { scheduleInput } from "../models/schedule";
import { createCertificate, updateCert } from "../models/certificate";
import { createJobInput, updateJobInput } from "../models/jobPosition";
import { inputTransaction } from "../models/transaction";
import { createCourse, updateCourse } from "../models/course";
import { createVoucher, updateVoucher } from "../models/voucher";
import { createPayment } from "../models/payment";
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
  updateJobPermission: (jobId: number, permission: number) =>
    requests.put1(
      `api/v1/job-position/Permission?jobPositionId=${jobId}&jobPositionPermission=${permission}`
    ),
};

const Certificate = {
  // getAllCertificates: (name?: string) =>
  //   requests.get(`api/v1/certification/${name ? name : ""}`),
  getAllCertificates: (name?: string) =>
    requests.get(
      `api/v1/certification/search${name ? `?certName=${name}` : ""}`
    ),
  getCertificateDetail: (certId: number | undefined) =>
    requests.get(`api/v1/certification/${certId}`),
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
  createQuestion: (input: createQuestion) =>
    requests.post(`api/v1/question`, input),
  deleteQuestion: (questionId: number) =>
    requests.del(`api/v1/question/${questionId}`),
  updateQuestion: (questionId: number, data: updateQuestion) =>
    requests.put(`api/v1/question/${questionId}`, data),
};

const FeedBack = {
  getFeedbackByExamId: (examId: number) =>
    requests.get(`api/v1/feedback/exam/${examId}`),
  getFeedbackDetail: (feedbackId: number) =>
    requests.get(`api/v1/feedback/exam/${feedbackId}`),
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
  createCourseEnroll: (input: createCourseEnrollment) =>
    requests.post("api/v1/course-enrollment", input),
  getExamByUserId: (userId: string) =>
    requests.get(`api/v1/exam-enrollment/get-by-userId/${userId}`),
  createExamEnroll: (input: createExamEnrollment) =>
    requests.post("api/v1/exam-enrollment", input),
};

const Payment = {
  createPayment: (input: createPayment) =>
    requests.post(`api/v1/payment`, input),
  examPayment: (userId: string) =>
    requests.get(`api/v1/payment/get-ExamEnrollment-by-userId/${userId}`),
  coursePayment: (userId: string) =>
    requests.get(`api/v1/payment/get-CourseEnrollment-by-userId/${userId}`),
};

const Scope = {
  submitScore: (input: createScore) =>
    requests.post(`api/v1/score`, input),

  // getScope: () => requests.get("api/v1/scope"),
  // getScopeDetail: (scopeId: string) => requests.get(`api/v1/scope/${scopeId}`),
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
  Scope,
};
export default agent;
