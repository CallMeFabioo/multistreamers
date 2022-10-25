'use client';

import React from 'react';
import { nanoid } from 'nanoid';

import { Header } from 'components/Header';
import { StreamContainer } from 'components/SteamContainer';
import { useStreamer } from 'hooks/useStreamer';
import { useRouter } from 'next/navigation';

export function HomePage() {
  // const router = useRouter();
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  const onSearch = (channel: string) => {
    addStreamer({
      id: nanoid(),
      channel,
      loaded: false
    });

    // router.push(`/streams/${channel}`);

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
