import axios, { AxiosRequestConfig, Method } from 'axios';
import { getErrorMessage, CustomError } from '../errors';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosServer = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await apiServer[method](url, ...rest);
    return res.data;
  } catch (error) {
    const message = getErrorMessage(error.response.status);

    throw new CustomError(message, error.response.status);
  }
};

export default axiosServer;
