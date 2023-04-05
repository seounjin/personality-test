import { wrapper } from '../store';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { RootState } from '../store/modules';
import { ParsedUrlQuery } from 'querystring';
import authFetcher from '../api/authFetcher';
import requestToken from '../api/requestToken';

type AuthorizeCallback = Promise<
  GetServerSidePropsResult<{ [key: string]: unknown }>
>;

interface AuthorizeProps {
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
  store: Store<RootState, AnyAction>;
  callback: (...props) => AuthorizeCallback;
}

const authorize = async ({ context, store, callback }: AuthorizeProps) => {
  const { req, res, params, query } = context;
  const cookie = req.headers.cookie;

  if (req && cookie) {
    const headers = {
      Cookie: cookie,
    };
    const authResponse = await authFetcher('get', '/auth', {
      headers,
    });

    if (authResponse.success) {
      return callback({
        auth: true,
        cookie: cookie,
        store,
        params,
        query,
        userId: authResponse.data.userId,
      });
    }

    if (authResponse.status === 400) {
      res.setHeader('Set-Cookie', [
        `accessToken=deleted; Max-Age=0; path=/`,
        `refreshToken=deleted; Max-Age=0; path=/`,
      ]);

      return callback({ auth: false });
    }

    const refreshTokenResponse = await requestToken(
      'get',
      '/auth/refresh-token',
      { headers },
    );

    if (refreshTokenResponse.status === 200) {
      const setCookie = refreshTokenResponse.headers['set-cookie'];
      res.setHeader('set-cookie', refreshTokenResponse.headers['set-cookie']);
      const { data } = refreshTokenResponse.data;

      return callback({
        auth: true,
        store,
        cookie: setCookie,
        params,
        query,
        userId: data.userId,
      });
    } else {
      res.setHeader('Set-Cookie', [
        `accessToken=deleted; Max-Age=0; path=/`,
        `refreshToken=deleted; Max-Age=0; path=/`,
      ]);
    }
  }

  return callback({ auth: false });
};

export const withAuth = ({ callback }): GetServerSideProps =>
  wrapper.getServerSideProps((store) => async (context) => {
    return authorize({
      context,
      store,
      callback,
    });
  });

export default withAuth;
