import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Error from 'next/error';
import Layout from '../layout';
import '../public/fonts/style.css';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('패이지프롭스', pageProps);
  console.log('컴포넌트', Component);
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
