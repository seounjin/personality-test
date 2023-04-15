import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Error from 'next/error';
import { wrapper } from '../store';
import useLoadingIndicator from '../hooks/useLoadingIndicator';
import Spinner from '../components/Spinner/Spinner';
import { ShadeScreen } from '../layout/ShadeScreen/ShadeScreen';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoading = useLoadingIndicator();

  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading && (
        <ShadeScreen>
          <Spinner />
        </ShadeScreen>
      )}
      <Head>
        <title>성향 테스트</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
