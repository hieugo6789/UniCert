import { AxiosResponse } from "axios";
import apiJWT from "./api";
import baseApi from "./baseApi";
import { MajorInput } from "../models/major";
import {
  createOrganizationModel,
  updateOrganize,
} from "../models/organization";
import { UpdateRole } from "../models/user";
import { scheduleInput } from "../models/schedule";
import { createCertificate, updateCert } from "../models/certificate";

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  post1: <T>(url: string, params?: T) =>
    apiJWT.post(url, { params }).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
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
  createMajors: (input: MajorInput) => requests.post("api/v1/Major", input),
  deleteMajor: (majorId: string) => requests.del(`/api/v1/major/${majorId}`),
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
};

const JobPosition = {
  getAllJob: (name?: string) =>
    requests.get(`api/v1/job-position/${name ? name : ""}`),
  getJobDetail: (jobId: string | undefined) =>
    requests.get(`api/v1/job-position/${jobId}`),
  deleteJob: (jobId: string) => requests.del(`api/v1/job-position/${jobId}`),
};

const Certificate = {
  // getAllCertificates: (name?: string) =>
  //   requests.get(`api/v1/certification/${name ? name : ""}`),
  getAllCertificates: (name?: string) =>
    requests.get(
      `api/v1/certification/search/${name ? `?certName=${name}` : ""}`
    ),
  getCertificateDetail: (certId: string | undefined) =>
    requests.get(`api/v1/certification/${certId}`),
  createCertificate: (input: createCertificate) =>
    requests.post("/api/v1/certification", input),
  deleteCertificate: (certId: string) =>
    requests.del(`api/v1/certification/${certId}`),
  updateCertificate: (certId: string, input: updateCert) =>
    requests.put(`api/v1/certification/${certId}`, input),
};

const Schedule = {
  getAllSchedule: (name?: string) =>
    requests.get(`api/v1/exam-session/${name ? name : ""}`),
  createSchedule: (input: scheduleInput) =>
    requests.post("api/v1/exam-session", input),
};

const InternalCourse = {
  getAllCourse: (name?: string) =>
    requests.get(`api/v1/course/${name ? name : ""}`),
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

const Profile = {
  getProfile: (userId: string | undefined) =>
    requests.get(`api/v1/profile/${userId}`),
};

const CertType = {
  getCertType: () => requests.get("api/v1/cert-type"),
  getCertTypeDetail: (typeId: string) =>
    requests.get(`api/v1/cert-type/${typeId}`),
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
  CertType,
};
export default agent;
