import { AxiosRequestConfig, Method } from 'axios';
import { getErrorMessage, CustomError } from '../errors';
import { axiosClient } from './axiosClient';

const axiosServer = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axiosClient[method](url, ...rest);
    return res.data;
  } catch (error) {
    const message = getErrorMessage(error.response.status);

    throw new CustomError(message, error.response.status);
  }
};

export default axiosServer;
