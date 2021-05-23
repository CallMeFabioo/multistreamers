import 'twin.macro';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { loadTwitchScrit } from 'lib/loadTwichScript';
import { urlWithoutProtocol } from 'lib/urlWithoutProtocol';

import { SearchInput } from 'components/SearchInput';
import { VideoContainer } from 'components/VideoContainer';
import { Container } from 'components/Container';
import { CloseVideoContainerButton } from 'components/CloseVideoContainerButton';
import { VideoPlayerBorderContainer } from 'components/VideoPlayerBorderContainer';
import { StreamersChat, VideoPlayer } from 'components/StreamersChat';

export default function Home() {
  const [videoPlayers, setVideoPlayers] = useState<Array<VideoPlayer>>([]);
  const [searchInputVisiblility, setSearchInputVisibility] = useState(true);

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

  const removeStreamer = (id: string) => {
    setVideoPlayers((prevState) => prevState.filter((s) => s.id !== id));
  };

  return (
    <Container hasChat={alreadyStreamLoaded}>
      <VideoContainer
        videos={videoPlayers.length}
        hasChat={alreadyStreamLoaded}
      >
        {videoPlayers.map(({ id }) => (
          <VideoPlayerBorderContainer key={id}>
            <CloseVideoContainerButton onClick={() => removeStreamer(id)} />
            <div id={id} tw="w-full h-full" />
          </VideoPlayerBorderContainer>
        ))}
        {videoPlayers.length < 9 && searchInputVisiblility && (
          <VideoPlayerBorderContainer>
            <CloseVideoContainerButton
              onClick={() => setSearchInputVisibility(false)}
            />
            <SearchInput onClick={addStreamer} />
          </VideoPlayerBorderContainer>
        )}
      </VideoContainer>
      {alreadyStreamLoaded && <StreamersChat videoPlayers={videoPlayers} />}
    </Container>
  );
}
