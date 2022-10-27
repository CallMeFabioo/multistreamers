'use client';

import React from 'react';

import { StreamerProvider } from 'hooks/useStreamer';
import { MultiStreamers } from './StreamersPage';

export default function StreamersPage(props) {
  return (
    <StreamerProvider>
      <MultiStreamers streams={props.params.streamers} />
    </StreamerProvider>
  );
}