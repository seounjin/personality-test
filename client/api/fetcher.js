import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

const fetcher = async (method, url, ...rest) => {
  try {
    const res = await axios[method](url, ...rest);
    console.log('res', res.status);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.log('fetcher error', error.response.status);
    return { status: error.response.status };
  }
};

export default fetcher;
