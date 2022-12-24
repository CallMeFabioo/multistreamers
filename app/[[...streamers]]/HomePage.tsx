'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

import { Header } from '../../src/components/Header';
import { StreamContainer } from '../../src/components/SteamContainer';
import { useStreamer } from '../../src/hooks/useStreamer';

export function HomePage() {
  const router = useRouter();
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  const onSearch = (channel: string) => {
    addStreamer({ id: nanoid(), channel });

    router.push(`/${channel}`);

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
