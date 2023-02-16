import { wrapper } from '../store';
import requestToken from '../api/requestToken';
import fetcher from '../api/fetcher';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { RootState } from '../store/modules';
import { ParsedUrlQuery } from 'querystring';

type AuthorizeCallback = Promise<
  GetServerSidePropsResult<{ [key: string]: unknown }>
>;

interface AuthorizeProps {
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
  store: Store<RootState, AnyAction>;
  callback: (...props) => AuthorizeCallback;
}

const authorize = async ({ context, store, callback }: AuthorizeProps) => {
  const { req, res, params } = context;
  const cookie = req.headers.cookie;

  if (req && cookie) {
    const headers = {
      Cookie: cookie,
    };
    const { success } = await fetcher('get', '/auth', {
      headers,
    });

    if (success) {
      if (params) {
        return callback({ auth: true, id: params.id, cookie: cookie, store });
      }
      return callback({ auth: true, cookie: cookie, store });
    }

    const refreshTokenResponse = await requestToken(
      'get',
      '/auth/refresh-token',
      { headers },
    );

    if (refreshTokenResponse.status === 200) {
      const setCookie = refreshTokenResponse.headers['set-cookie'];
      res.setHeader('set-cookie', refreshTokenResponse.headers['set-cookie']);
      if (params) {
        return callback({
          auth: true,
          id: params.id,
          cookie: setCookie,
          store,
        });
      }
      return callback({ auth: true, store, cookie: setCookie });
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
