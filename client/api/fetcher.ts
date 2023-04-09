import { AxiosRequestConfig, Method } from 'axios';
import { axiosClient } from './axiosClient';

const fetcher = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axiosClient[method](url, ...rest);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return { success: false, status: 503 };
  }
};

export default fetcher;
