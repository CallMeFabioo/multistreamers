'use client';

import React from 'react';

import { StreamerProvider } from 'hooks/useStreamer';
import { HomePage } from '../app/HomePage';

export default function RootPage() {
  return (
    <StreamerProvider>
      <HomePage />
    </StreamerProvider>
  );
}
