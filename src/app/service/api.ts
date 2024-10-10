import axios from "axios";
import { IApiError } from "../interface/ApiError";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
};

async function requestAxios<T>(
  method: 'GET' | 'POST' | 'PUT',
  url: string,
  params?: any
): Promise<T | IApiError> {
  try {
    const response = await axios.request({
      method,
      url: `${baseURL}${url}`,
      headers,
      data: params, 
    });
    return response.data;
  } catch (error: any) {
    const apiError: IApiError = {
      ...error,
      code: error.response?.status,
      details: error.response?.data,
    };
    throw apiError;
  }
}

export { requestAxios };