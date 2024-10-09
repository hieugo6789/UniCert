import { AxiosResponse } from "axios";
import apiJWT from "./api";
import baseApi from "./baseApi";
import { MajorInput } from "../models/major";
import { createOrganizationModel } from "../models/organization";
import { UpdateRole } from "../models/user";

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
  createMajors: (input: MajorInput) => requests.post("api/v1/Major", input),
};
const Organization = {
  getAllOrganizations: (name?: string) =>
    requests.get(`api/v1/organize/${name ? name : ""}`),
  createOrganize: (input: createOrganizationModel) =>
    requests.post("/api/v1/organize", input),
};

const Account = {
  getAllAccount: () => requests.get("api/v1/Users"),
  getAccountDetail: (userId: string) => requests.get(`api/v1/users/${userId}`),
  updateAccountInformation: (input: UpdateRole, userId: string) =>
    requests.put(`/api/v1/users/${userId}`, input),
};

const agent = { Major, Account, Organization };
export default agent;
