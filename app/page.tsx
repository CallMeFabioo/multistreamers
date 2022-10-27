'use client';

import * as React from 'react';

import { StreamerProvider } from 'hooks/useStreamer';
import { HomePage } from 'routes/HomePage';

export default function RootPage() {
  return (
    <StreamerProvider>
      <HomePage />
    </StreamerProvider>
  );
}
