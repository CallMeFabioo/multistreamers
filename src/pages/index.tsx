import * as React from 'react';

import { Header } from 'components/Header';

import { useStreamer } from 'hooks/useStreamer';
import { nanoid } from 'nanoid';
import { StreamContainer } from 'components/SteamContainer';

export type Streamer = {
  id: string;
  channel: string;
  loaded: boolean;
};

export default function Home() {
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
