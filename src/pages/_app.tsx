import type { AppProps } from 'next/app';
import Head from 'next/head';

import { GlobalStyles } from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Multistreamers - Watch yout favorites streamers all at once!
        </title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default App;
