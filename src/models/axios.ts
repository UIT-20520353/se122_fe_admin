interface FieldErrorData {
  field: number;
  message: string;
}

interface AxiosResponseData {
  violations: FieldErrorData[];
  detail: string;
  errors: object;
}

export default AxiosResponseData;
