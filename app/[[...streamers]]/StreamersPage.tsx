'use client';

import React, { useEffect } from 'react';

import { nanoid } from 'nanoid';

import { useStore } from '@src/store/store';

import { StreamContainer } from '@components/SteamContainer';

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
