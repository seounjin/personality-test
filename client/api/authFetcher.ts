import { AxiosRequestConfig, Method } from 'axios';
import { apiServer } from './axiosServer';

const authFetcher = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await apiServer[method](url, ...rest);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return { success: false, status: 503 };
  }
};

export default authFetcher;
