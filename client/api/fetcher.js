import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

const fetcher = async (method, url, ...rest) => {
  try {
    const res = await axios[method](url, ...rest);
    console.log('status', res.status);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
  } catch (error) {
    const errorStatus = error.response ? error.response.status : 500;
    console.log('fetcher error', errorStatus);
    return { status: errorStatus };
  }
};

export default fetcher;
