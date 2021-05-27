import 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { loadTwitchScrit } from 'lib/loadTwichScript';
import { urlWithoutProtocol } from 'lib/urlWithoutProtocol';

import { SearchInput } from 'components/SearchInput';
import { VideoContainer } from 'components/VideoContainer';
import { Container } from 'components/Container';
import { StreamersChat, VideoPlayer } from 'components/StreamersChat';
import { Header } from 'components/Header';

export default function Home() {
  const [videoPlayers, setVideoPlayers] = useState<Array<VideoPlayer>>([]);
  const [hideSearchInput, setHideSearchInput] = useState(false);

  const alreadyStreamLoaded = videoPlayers.some((v) => v.loaded);
  const hasChatOpen = videoPlayers.every((v) => v.isChatClosed);

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

    if (videoPlayers.length < 1 && hideSearchInput) {
      setHideSearchInput(false);
    }
  }, [videoPlayers, hideSearchInput]);

  const addStreamer = (channel: string) => {
    setVideoPlayers((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        channel,
        loaded: false,
        isChatClosed: null
      }
    ]);
  };

  const removeStreamer = useCallback(
    (id) =>
      setVideoPlayers((prevState) => prevState.filter((s) => s.id !== id)),
    []
  );

  const closeChat = (id: string) => {
    console.log(id);
    setVideoPlayers((prevState) =>
      prevState.map((state) => {
        if (state.id === id) {
          state = { ...state, isChatClosed: true };
        }

        return state;
      })
    );
  };

  return (
    <>
      <Header onSearchClick={addStreamer} hideSearchInput={hideSearchInput} />
      <Container hasChat={alreadyStreamLoaded && !hasChatOpen}>
        <VideoContainer
          videos={videoPlayers.length}
          hasChat={alreadyStreamLoaded && !hasChatOpen}
          isSearchInputHided={hideSearchInput}
        >
          {videoPlayers.map(({ id }) => (
            <Container.Border key={id}>
              <Container.CloseButton onClick={() => removeStreamer(id)} />
              <div id={id} tw="w-full h-full" />
            </Container.Border>
          ))}
          {videoPlayers.length < 9 && !hideSearchInput && (
            <Container.Border>
              {videoPlayers.length >= 1 && (
                <Container.CloseButton
                  onClick={() => setHideSearchInput(true)}
                />
              )}
              <SearchInput onClick={addStreamer} />
            </Container.Border>
          )}
        </VideoContainer>
        {alreadyStreamLoaded && !hasChatOpen && (
          <StreamersChat videoPlayers={videoPlayers} closeChat={closeChat} />
        )}
      </Container>
    </>
  );
}
