import * as React from 'react';

import { Header } from 'components/Header';

import { useStreamer } from 'hooks/useStreamer';
import { useRouter } from 'next/dist/client/router';
import { nanoid } from 'nanoid';
import { StreamContainer } from 'components/SteamContainer';
import Script from 'next/script';

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
