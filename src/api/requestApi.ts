import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { HttpResponse } from "../models/http";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const requestApi = {
  sendRequest: (userId: number): Promise<HttpResponse<unknown>> => {
    const url = "/api/requests";
    return handleRequest(
      axiosClient.post(
        url,
        {
          targetUserId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage(
              ACCESS_TOKEN_LOCAL_STORAGE_KEY
            )}`,
          },
        }
      )
    );
  },
  cancelRequestByUserId: (userId: number): Promise<HttpResponse<unknown>> => {
    const url = `/api/requests/user/${userId}`;
    return handleRequest(
      axiosClient.delete(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
};

export default requestApi;
