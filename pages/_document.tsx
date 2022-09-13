import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <script src="https://use.typekit.net/rbv2hxr.js"></script>
          <script></script>
        </Head>
        <body>
          <script
            type="text/javascript"
            src="/assets/scripts/typekit.js"
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
