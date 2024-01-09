/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { BadRequestFieldError, HttpResponse } from "../models/http";
import AxiosResponseData from "../models/axios";
import { isEmptyObject } from "../utils/commonUtils";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// NOTE: Add a request interceptor
axiosClient.interceptors.request.use(
  // NOTE: Do something before request is sent
  (config) => config,
  // NOTE: Do something with request error
  (error) => Promise.reject(error)
);

// NOTE: Add a response interceptor
axiosClient.interceptors.response.use(
  // @ts-expect-error: we want to return the different data type
  (response: AxiosResponse<AxiosResponseData>) => {
    // NOTE: Any status code that lie within the range of 2xx cause this function to trigger
    // NOTE: Do something with response data
    const { status, data: responseData, headers } = response;

    const data: HttpResponse<object> = {
      status,
      ok: true,
      body: responseData,
    };

    if (headers.link) {
      data.pagination = {
        total: Number(headers["x-total-count"]),
      };
    }

    return data;
  },
  ({ response }) => {
    // NOTE: Any status codes that falls outside the range of 2xx cause this function to trigger
    // NOTE: Do something with response error
    const { status, data } = response as AxiosResponse<AxiosResponseData>;
    const fieldErrors: BadRequestFieldError = {};

    if (data?.violations?.length) {
      data.violations.forEach(() => {
        const { field, message } = data.violations[0];

        if (fieldErrors[field]) {
          fieldErrors[field].push(message);
        } else {
          fieldErrors[field] = [message];
        }
      });
    }

    const error: HttpResponse = {
      status,
      ok: false,
      error: {
        unauthorized: status === 401,
        badRequest: status === 400,
        notFound: status === 404,
        clientError: status >= 400 && status <= 499,
        serverError: status >= 500 && status <= 599,
        message: data.detail,
        title: `${data.detail}-title`,
        fieldErrors: isEmptyObject(fieldErrors) ? undefined : fieldErrors,
        errors: data.errors,
      },
    };

    return Promise.reject(error);
  }
);

const handleRequest = (promise: Promise<HttpResponse>) =>
  promise.then((res) => res).catch((err) => err as HttpResponse<any>);

export default axiosClient;

export { handleRequest };
