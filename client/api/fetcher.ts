import { AxiosRequestConfig, Method } from 'axios';
import { axiosClient } from './axiosClient';

const fetcher = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axiosClient[method](url, ...rest);
    console.log('status!!', res.status);
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

export default fetcher;

// import axios, { AxiosRequestConfig, Method } from 'axios';

// axios.defaults.baseURL = 'http://localhost:8080/api/v1';
// axios.defaults.withCredentials = true;

// const fetcher = async (
//   method: Method,
//   url: string,
//   ...rest: AxiosRequestConfig[]
// ) => {
//   try {
//     const res = await axios[method](url, ...rest);
//     console.log('status', res.status);
//     if (res.status >= 200) {
//       return res.data;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.log('fetcher 에러', error.response.data);
//       console.log('fetcher 상태코드', error.response && error.response.status);
//       return error.response;
//     }

//     return { success: false, status: 503 };
//   }
// };

// export default fetcher;
