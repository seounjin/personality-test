import { AxiosRequestConfig, Method } from 'axios';
import { axiosNext } from './axiosNext';

const authFetcher = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axiosNext[method](url, ...rest);
    console.log('status', res.status);
    if (res.status >= 200) {
      return res.data;
    }
  } catch (error) {
    if (error.response) {
      console.log('fetcher 에러', error.response.data);
      console.log('fetcher 상태코드', error.response && error.response.status);
      return error.response;
    }

    return { success: false, status: 503 };
  }
};

export default authFetcher;
