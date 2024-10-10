import { AxiosError } from "axios";

export interface IApiError extends AxiosError {
    code?: string;
    details?: any;
  }