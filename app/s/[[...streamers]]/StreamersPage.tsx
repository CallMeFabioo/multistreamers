'use client';

import React from 'react';

import { Header } from '../../../src/components/Header';

import { useStreamer } from '../../../src/hooks/useStreamer';
import { nanoid } from 'nanoid';
import { StreamContainer } from '../../../src/components/SteamContainer';

export function MultiStreamers({ streams }: { streams: string[] }) {
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  React.useEffect(() => {
    if (streams && streams.length > 0) {
      const newStreamers = streams.map((streamer) => ({
        id: nanoid(),
        channel: streamer,
        loaded: false
      }));

      addStreamer(newStreamers);
    }
  }, [addStreamer, streams]);

  const onSearch = React.useCallback(
    (channel: string) => {
      addStreamer({
        id: nanoid(),
        channel,
        loaded: false
      });

      if (streamers.length === 0) {
        setToggleChat(true);
      }
    },
    [addStreamer, streamers.length]
  );

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
