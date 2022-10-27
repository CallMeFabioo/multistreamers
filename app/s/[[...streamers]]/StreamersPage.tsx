'use client';

import React from 'react';
import { nanoid } from 'nanoid';

import { Header } from '../../../src/components/Header';

import { useStreamer } from '../../../src/hooks/useStreamer';
import { StreamContainer } from '../../../src/components/SteamContainer';

export function MultiStreamers({ streams }: { streams: string[] }) {
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  React.useEffect(() => {
    if (streams && streams.length > 0) {
      addStreamer(streams.map((s) => ({ id: nanoid(), channel: s })));
    }
  }, [addStreamer, streams]);

  const onSearch = (channel: string) => {
    addStreamer({ id: nanoid(), channel });

    if (streamers.length === 0) {
      setToggleChat(true);
    }
  };

  return (
    <>
      <Header
        onSearch={onSearch}
        toggleChat={() => setToggleChat(!toggleChat)}
      />

      <StreamContainer streamers={streamers} toggleChat={toggleChat} />
    </>
  );
}
