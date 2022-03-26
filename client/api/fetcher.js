import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

const fetcher = async (method, url, ...rest) => {
  try {
    const res = await axios[method](url, ...rest);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log('!!', error.response);
      return { status: error.response.status };
    }

    // window.history.replaceState(status, '', '/');
  }
};

export default fetcher;
