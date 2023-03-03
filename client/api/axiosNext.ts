import Axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers'; // Import cookies

const BASE_URL = 'http://localhost:8080/api/v1';
const REQUEST_REFRESH_TOKEN_URL = 'http://localhost:3000';

export const axiosNext = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// const refreshAuthLogic = async (failedRequest) => {
//   axiosNext
//     .get(`/api/refreshToken`, { baseURL: REQUEST_REFRESH_TOKEN_URL })
//     .then((res) => {
//       // console.log('이건모지', failedRequest);
//       console.log('리플래쉬');
//       //   localStorage.setItem('token', tokenRefreshResponse.data.token);
//       //   failedRequest.response.config.headers['Authorization'] =
//       //     'Bearer ' + tokenRefreshResponse.data.token;
//       return Promise.resolve();
//     })
//     .catch((error) => {
//       console.log('에러!!!!!!!!!!', error.response.status);
//     });
// };
// // Instantiate the interceptor
// createAuthRefreshInterceptor(axiosNext, refreshAuthLogic);
