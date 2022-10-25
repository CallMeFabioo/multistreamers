'use client';

import * as React from 'react';

import { Header } from 'components/Header';

import { StreamerProvider, useStreamer } from 'hooks/useStreamer';
import { nanoid } from 'nanoid';
import { StreamContainer } from 'components/SteamContainer';
import { usePathname, useRouter } from 'next/navigation';

function MultiStreamers({ streams }: { streams: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
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

      // router.replace(`${pathname}/${channel}`);

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

export default function StreamersPage(props) {
  return (
    <StreamerProvider>
      <MultiStreamers streams={props.params.streamers} />
    </StreamerProvider>
  );
}
