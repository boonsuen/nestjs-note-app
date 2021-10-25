import NProgress from 'nprogress';
import Router from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle, { fontFaceRules } from '../components/GlobalStyle.css';
import 'antd/dist/antd.css';

// NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
