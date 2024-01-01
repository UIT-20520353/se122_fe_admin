import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import {
  LoginRequestModel,
  LoginResponseModel,
  RegisterRequestModel,
  UserProfileModel,
} from "../models/auth";
import { HttpResponse } from "../models/http";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const authApi = {
  login: (
    request: LoginRequestModel
  ): Promise<HttpResponse<LoginResponseModel>> => {
    const url = "/api/admin/login";
    return handleRequest(axiosClient.post(url, request));
  },
  register: (request: RegisterRequestModel): Promise<HttpResponse<unknown>> => {
    const url = "/api/register";
    return handleRequest(axiosClient.post(url, request));
  },
  logout: (): Promise<HttpResponse<unknown>> => {
    const url = "/api/logout";
    return handleRequest(
      axiosClient.post(url, null, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
  getProfile: (): Promise<HttpResponse<UserProfileModel>> => {
    const url = "/api/profile";
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
};

export default authApi;
