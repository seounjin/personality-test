import { AxiosRequestConfig, Method } from 'axios';
import { useDispatch } from 'react-redux';
import { axiosClient } from '../api/axiosClient';
import { setIsLoading } from '../store/modules/loading';

export const useFetcher = () => {
  const dispatch = useDispatch();

  const fetcher = async (
    method: Method,
    url: string,
    ...rest: AxiosRequestConfig[]
  ) => {
    try {
      dispatch(setIsLoading({ isLoading: true }));
      const res = await axiosClient[method](url, ...rest);
      dispatch(setIsLoading({ isLoading: false }));
      return res.data;
    } catch (error) {
      dispatch(setIsLoading({ isLoading: false }));
      if (error.response) {
        return error.response;
      }
      return { success: false, status: 503 };
    }
  };

  return fetcher;
};
