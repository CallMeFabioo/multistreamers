import 'twin.macro';
import * as React from 'react';
import Script from 'next/script';

import { Header } from 'components/Header';
import { StreamerChat } from 'components/StreamerChat';
import { Stream } from 'components/Stream';

import { useStreamer } from 'hooks/useStreamer';
import { useRouter } from 'next/dist/client/router';
import { nanoid } from 'nanoid';

export type Streamer = {
  id: string;
  channel: string;
  main: boolean;
  loaded: boolean;
};

export default function Streamers() {
  const router = useRouter();
  const [toggleChat, setToggleChat] = React.useState(false);
  const { streamers, addStreamer } = useStreamer();

  const streamersQuery = router.query.streamers as string[];

  React.useEffect(() => {
    if (streamersQuery && streamersQuery.length > 0) {
      const newStreamers = streamersQuery.map((streamer) => ({
        id: nanoid(),
        channel: streamer,
        main: streamersQuery.length === 0,
        loaded: false
      }));

      addStreamer(newStreamers);
    }
  }, [addStreamer, streamersQuery]);

  const onSearch = React.useCallback(
    (channel: string) => {
      addStreamer({
        id: nanoid(),
        channel,
        main: streamers.length === 0,
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
      <Script
        src="https://embed.twitch.tv/embed/v1.js"
        strategy="beforeInteractive"
      />

      <Header
        onSearch={onSearch}
        toggleChat={() => setToggleChat(!toggleChat)}
      />

      <main tw="flex gap-2 p-2 text-white transition-all">
        <ul tw="relative grid flex-1 h-full grid-cols-4 gap-2">
          {streamers.map((streamer, index) => (
            <React.Fragment key={streamer.id}>
              {index === 0 ? (
                <Stream type="main" streamer={streamer} />
              ) : (
                <Stream streamer={streamer} />
              )}
            </React.Fragment>
          ))}
        </ul>
        {streamers.length > 0 && toggleChat && (
          <StreamerChat streamer={streamers[0]} />
        )}
      </main>
    </>
  );
}
