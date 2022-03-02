import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const fetcher = async (method, url, ...rest) => {
  try {
    const res = await axios[method](url, ...rest);
    return res.data;
  } catch (error) {
    console.log('에러', error);
  }
};

export default fetcher;
