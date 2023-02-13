import { setIsAuth } from '../store/modules/home';
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

type AuthorizeCallback = (
  arg: boolean,
) => Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>;

interface AuthorizeProps {
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
  store: Store<RootState, AnyAction>;
  callback: AuthorizeCallback;
}

const authorize = async ({ context, store, callback }: AuthorizeProps) => {
  const { req, res } = context;
  const cookie = req.headers.cookie;

  if (req && cookie) {
    const headers = {
      Cookie: cookie,
    };
    const { success } = await fetcher('get', '/auth', {
      headers,
    });

    if (success) {
      store.dispatch(setIsAuth(true));
      return callback(true);
    }

    const refreshTokenResponse = await requestToken(
      'get',
      '/auth/refresh-token',
      { headers },
    );

    if (refreshTokenResponse.status === 200) {
      res.setHeader('set-cookie', refreshTokenResponse.headers['set-cookie']);
      store.dispatch(setIsAuth(true));
      return callback(true);
    }
  }

  return callback(false);
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
