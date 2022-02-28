import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Layout from '../layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
