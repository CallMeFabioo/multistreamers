import 'styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { StreamerProvider } from 'hooks/useStreamer';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Multistreamers - Watch your favorites streamers all at once!
        </title>
      </Head>

      <StreamerProvider>
        <Component {...pageProps} />
      </StreamerProvider>
    </>
  );
}

export default App;
