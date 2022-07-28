import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={{ colorScheme: 'light' }}
      >
        <ApolloProvider client={apolloClient}>
          {/* <Header /> */}
          <div className='h-screen overflow-y-scroll bg-slate-200'>
            <Header />
            <Component {...pageProps} />
          </div>
        </ApolloProvider>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
