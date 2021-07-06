import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { StreamerProvider } from 'hooks/useStreamer';

import { GlobalStyles } from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Multistreamers - Watch your favorites streamers all at once!
        </title>
      </Head>

      <GlobalStyles />
      <Script
        src="https://embed.twitch.tv/embed/v1.js"
        strategy="afterInteractive"
      />
      <StreamerProvider>
        <Component {...pageProps} />
      </StreamerProvider>
    </>
  );
}

export default App;
