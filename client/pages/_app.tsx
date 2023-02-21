import { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Error from 'next/error';
import '../public/fonts/style.css';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
