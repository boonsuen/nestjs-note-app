import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle, { fontFaceRules } from '../components/GlobalStyle.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/favicon.svg" />
        <style
          dangerouslySetInnerHTML={{
            __html: fontFaceRules,
          }}
        ></style>
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}
export default MyApp;
