'use client';

import { StreamerProvider } from '../../src/hooks/useStreamer';

import { HomePage } from './HomePage';
import { MultiStreamers } from './StreamersPage';

type Props = {
  params: { streamers?: string[] };
};

export default function RootPage({ params }: Props) {
  return (
    <StreamerProvider>
      {params?.streamers?.length > 0 ? (
        <MultiStreamers streams={params.streamers} />
      ) : (
        <HomePage />
      )}
    </StreamerProvider>
  );
}
