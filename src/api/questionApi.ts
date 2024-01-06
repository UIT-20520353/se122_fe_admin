import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { HttpResponse } from "../models/http";
import { QuestionRequest } from "../models/question";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const questionApi = {
  addQuestion: (formData: FormData): Promise<HttpResponse<unknown>> => {
    const url = "/api/admin/questions/add";
    return handleRequest(
      axiosClient.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
  updateQuestion: (formData: FormData): Promise<HttpResponse<unknown>> => {
    const url = "/api/admin/questions/update";
    return handleRequest(
      axiosClient.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
  deleteQuestion: (id: number): Promise<HttpResponse<unknown>> => {
    const url = `/api/admin/questions/${id}`;
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
  addQuestionReading: (
    body: QuestionRequest
  ): Promise<HttpResponse<unknown>> => {
    const url = "/api/admin/questions";
    return handleRequest(
      axiosClient.post(url, body, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(
            ACCESS_TOKEN_LOCAL_STORAGE_KEY
          )}`,
        },
      })
    );
  },
};

export default questionApi;
