'use client';

import * as React from 'react';

import { StreamerProvider } from 'hooks/useStreamer';
import { HomePage } from 'routes/HomePage';

export type Streamer = {
  id: string;
  channel: string;
  loaded: boolean;
};

export default function RootPage() {
  return (
    <StreamerProvider>
      <HomePage />
    </StreamerProvider>
  );
}
