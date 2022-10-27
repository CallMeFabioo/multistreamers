'use client';

import React from 'react';
import { nanoid } from 'nanoid';

import { Header } from 'components/Header';
import { StreamContainer } from 'components/SteamContainer';
import { useStreamer } from 'hooks/useStreamer';

export function HomePage() {
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  const onSearch = (channel: string) => {
    addStreamer({
      id: nanoid(),
      channel,
      loaded: false
    });

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
