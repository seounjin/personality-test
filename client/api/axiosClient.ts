import axios from 'axios';
import { useRouter } from 'next/router';
import requestToken from './requestToken';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;
      try {
        const res = await requestToken('get', '/auth/refresh-token');
        if (res.status === 200) {
          return axiosClient(originalRequest);
        }
        if (res.status === 400 || res.status === 401) {
          return Promise.reject({
            response: { status: res.status, data: { success: false } },
          });
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const useRedirectToLoginPage = () => {
  const router = useRouter();
  router.push('/login');
};
