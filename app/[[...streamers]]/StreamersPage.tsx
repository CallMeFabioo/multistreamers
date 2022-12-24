'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';

import { Header } from '../../src/components/Header';

import { useStreamer } from '../../src/hooks/useStreamer';
import { StreamContainer } from '../../src/components/SteamContainer';

export function MultiStreamers({ streams }: { streams: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  React.useEffect(() => {
    if (streams && streams.length > 0) {
      addStreamer(streams.map((s) => ({ id: nanoid(), channel: s })));
    }
  }, [addStreamer, streams]);

  const onSearch = (channel: string) => {
    addStreamer({ id: nanoid(), channel });

    const route = pathname
      .split('/')
      .filter(Boolean)
      .concat([channel])
      .join('/');

    router.replace(`/${route}`);

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
