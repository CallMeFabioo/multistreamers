'use client';

import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Header } from '../../src/components/Header';

import { StreamContainer } from '../../src/components/SteamContainer';
import { useStore } from '../../src/store/store';

export function MultiStreamers({ streams }: { streams: string[] }) {
  const addStreamer = useStore((state) => state.addStreamer);

  useEffect(() => {
    if (streams && streams.length > 0) {
      streams.map((s) => addStreamer({ id: nanoid(), channel: s }));
    }
  }, [addStreamer, streams]);

  return (
    <>
      <StreamContainer />
    </>
  );
}
