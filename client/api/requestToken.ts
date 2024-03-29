import axios, { AxiosRequestConfig, Method } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const requestToken = async (
  method: Method,
  url: string,
  ...rest: AxiosRequestConfig[]
) => {
  try {
    const res = await axios[method](url, ...rest);
    return res;
  } catch (error) {
    const errorStatus = error.response ? error.response.status : 500;
    return { status: errorStatus };
  }
};

export default requestToken;
