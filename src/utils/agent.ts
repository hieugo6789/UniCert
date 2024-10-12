import { AxiosResponse } from "axios";
import apiJWT from "./api";
import baseApi from "./baseApi";
import { MajorInput } from "../models/major";
import { createOrganizationModel } from "../models/organization";
import { UpdateRole } from "../models/user";
import { scheduleInput } from "../models/schedule";

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
};
const Organization = {
  getAllOrganizations: (name?: string) =>
    requests.get(`api/v1/organize/${name ? name : ""}`),
  createOrganize: (input: createOrganizationModel) =>
    requests.post("/api/v1/organize", input),
};

const JobPosition = {
  getAllJob: (name?: string) =>
    requests.get(`api/v1/job-position/${name ? name : ""}`),
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
  deleteCertificate: (certId: string) =>
    requests.del(`api/v1/certification/${certId}`),
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
};

const Profile = {
  getProfile: (userId: string | undefined) =>
    requests.get(`api/v1/profile/${userId}`),
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
};
export default agent;
