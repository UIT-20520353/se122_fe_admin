import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../consts/app";
import { BaseRequestQueryParam, HttpResponse } from "../models/http";
import { TestDetail, TestModel, TestRequest } from "../models/test";
import { getLocalStorage } from "../utils/localStorage";
import axiosClient, { handleRequest } from "./axiosClient";

const testApi = {
  getTests: (
    params: BaseRequestQueryParam
  ): Promise<HttpResponse<TestModel[]>> => {
    const url = "/api/admin/tests";
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
  getTest: (testId: number): Promise<HttpResponse<TestDetail>> => {
    const url = `/api/admin/tests/${testId}`;
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
  updateTestInformation: ({
    id,
    title,
    difficultyLevel,
  }: {
    id: number;
    title: string;
    difficultyLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ENTRY_TEST";
  }): Promise<HttpResponse<TestModel>> => {
    const url = `/api/admin/tests/${id}`;
    return handleRequest(
      axiosClient.post(
        url,
        { title, difficultyLevel },
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
  addResource: (
    formData: FormData,
    testId: string
  ): Promise<HttpResponse<unknown>> => {
    const url = `/api/admin/tests/${testId}/reading/add`;
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
  createTest: (body: TestRequest): Promise<HttpResponse<unknown>> => {
    const url = "/api/admin/tests";
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

export default testApi;
