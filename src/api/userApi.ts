import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { BaseRequestQueryParam, HttpResponse } from "../models/http";
import { UserDetail, UserModel } from "../models/user";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const userApi = {
  getUsers: (
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<UserModel[]>> => {
    const url = "/api/admin/users";
    return handleRequest(
      axiosClient.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },

  blockUser: (userId: number): Promise<HttpResponse<unknown>> => {
    const url = `/api/admin/users/${userId}/block`;
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

  unblockUser: (userId: number): Promise<HttpResponse<unknown>> => {
    const url = `/api/admin/users/${userId}/unblock`;
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
  getUserDetail: (userId: number): Promise<HttpResponse<UserDetail>> => {
    const url = `/api/admin/users/${userId}`;
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

export default userApi;
