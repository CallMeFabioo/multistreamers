import 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { loadTwitchScrit } from 'lib/loadTwichScript';
import { urlWithoutProtocol } from 'lib/urlWithoutProtocol';

import { SearchInput } from 'components/SearchInput';
import { VideoContainer } from 'components/VideoContainer';
import { Container } from 'components/Container';
import { StreamersChat, VideoPlayer } from 'components/StreamersChat';

export default function Home() {
  const [videoPlayers, setVideoPlayers] = useState<Array<VideoPlayer>>([]);
  const [hideSearchInput, setHideSearchInput] = useState(true);

  const alreadyStreamLoaded = videoPlayers.some((v) => v.loaded);

  useEffect(() => {
    loadTwitchScrit();
  }, []);

  useEffect(() => {
    videoPlayers.forEach(({ id, channel, loaded }) => {
      if (channel && !loaded) {
        new (window as DefaultWindow).Twitch.Embed(id, {
          channel,
          layout: 'video',
          width: '100%',
          height: '100%',
          parent: [urlWithoutProtocol, `www.${urlWithoutProtocol}`]
        });

        setVideoPlayers((prevState) => {
          return prevState.map((state) => {
            if (state.id === id) {
              state = { ...state, loaded: true };
            }

            return state;
          });
        });
      }
    });
  }, [videoPlayers]);

  const addStreamer = (channel: string) => {
    setVideoPlayers((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        channel,
        loaded: false
      }
    ]);
  };

  const removeStreamer = useCallback(
    (id) =>
      setVideoPlayers((prevState) => prevState.filter((s) => s.id !== id)),
    []
  );

  return (
    <Container hasChat={alreadyStreamLoaded}>
      <VideoContainer
        videos={videoPlayers.length}
        hasChat={alreadyStreamLoaded}
      >
        {videoPlayers.map(({ id }) => (
          <Container.Border key={id}>
            <Container.CloseButton onClick={() => removeStreamer(id)} />
            <div id={id} tw="w-full h-full" />
          </Container.Border>
        ))}
        {videoPlayers.length < 9 && hideSearchInput && (
          <Container.Border>
            {videoPlayers.length >= 1 && (
              <Container.CloseButton
                onClick={() => setHideSearchInput(false)}
              />
            )}
            <SearchInput onClick={addStreamer} />
          </Container.Border>
        )}
      </VideoContainer>
      {alreadyStreamLoaded && <StreamersChat videoPlayers={videoPlayers} />}
    </Container>
  );
}
