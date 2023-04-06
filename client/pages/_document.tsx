import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta
            name="description"
            content="각양각색의 사람들의 성향을 테스트 할 수 있는 폼을 제공해주는 서비스입니다."
          />
          <meta
            name="keywords"
            content="성향, 테스트, 성향테스트, mbti, 사람, 성격, 점수형, O X형"
          />
          <meta name="author" content="Sung Jin, Young Nam" />

          <meta
            property="og:image"
            content="https://rororo-marshmallow.store/api/og"
          />
          <meta property="og:title" content="성향테스트" />
          <meta
            property="og:description"
            content="성향테스트를 만들고 공유할수 있어요."
          />
          <meta property="og:url" content="rororo-marshmallow.store" />
        </Head>
        <title>성향 테스트</title>

        <body>
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
