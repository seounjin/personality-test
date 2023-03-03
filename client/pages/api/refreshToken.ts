import axios from 'axios';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'http://localhost:8080/api/v1';

const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req;
  // const cookie = req.headers.cookie;

  const cookie = getCookie('accessToken');

  try {
    // const {
    //   data,
    //   headers: returnedHeaders,
    //   status,
    // } = await axios.get(`${BASE_URL}/auth/refresh-token`, { headers });

    // //  Update headers on requester using headers from Node.js server response
    // Object.keys(returnedHeaders).forEach((key) =>
    //   res.setHeader(key, returnedHeaders[key]),
    // );

    return res.status(200).json({ success: true });
  } catch (error) {
    // we don't want to send status 401 here.
    console.log('에러!!!!!!!!!!!!', headers);

    return res.send(error);
  }
};

export default refreshToken;
