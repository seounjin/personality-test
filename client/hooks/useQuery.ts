import { useRouter } from 'next/router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

const useQuery = async (method, url, ...rest) => {
  const router = useRouter();

  try {
    const res = await axios[method](url, ...rest);
    return res.data;
  } catch (error) {
    const { status } = error.response;

    console.log('fetcher 에러!!', status);
    return;
  }
};

export default useQuery;
