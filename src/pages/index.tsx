import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { loadTwitchScrit } from 'lib/loadTwichScript';

import { SearchInput } from 'components/SearchInput';

type VideoPlayer = {
  id: string;
  channel: string;
  loaded: boolean;
};

const urlWithoutProtocol = process.env.NEXT_PUBLIC_SITE_URL?.replace(
  /http(s)?:\/\//i,
  ''
) as string;

const buildChatUrl = (channel = '') => {
  const params = new URLSearchParams([
    // ['parent', 'vercel.app'],
    // ['parent', 'www.vercel.app'],
    ['parent', urlWithoutProtocol],
    ['parent', `www.${urlWithoutProtocol}`]
  ]);

  const url = `https://www.twitch.tv/embed/${channel}/chat?${params}`;

  return url;
};

export default function Home() {
  const [videoPlayers, setVideoPlayers] = useState<Array<VideoPlayer>>(() =>
    Array.from({ length: 4 }).map(() => ({
      id: nanoid(),
      channel: '',
      loaded: false
    }))
  );

  const onClick = (videoPlayerId: string, channel: string) => {
    setVideoPlayers((prevState) => {
      return prevState.map((state) => {
        if (state.id === videoPlayerId) {
          state = { ...state, channel };
        }

        return state;
      });
    });
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

  return (
    <div
      css={[
        tw`text-white h-full p-2 grid grid-rows-1 gap-2 grid-cols-2 items-center justify-between justify-self-center`,
        alreadyStreamLoaded && tw`grid-cols-4`
      ]}
    >
      <main
        css={[
          tw`grid grid-cols-2 col-span-2 gap-2 h-full`,
          alreadyStreamLoaded && tw`col-span-3`
        ]}
      >
        {videoPlayers.map((videoPlayer) => (
          <div
            key={videoPlayer.id}
            tw="border-2 border-dashed border-gray-800 rounded flex items-center justify-center"
          >
            {videoPlayer.channel ? (
              <div id={videoPlayer.id} tw="w-full h-full"></div>
            ) : (
              <SearchInput
                onClick={(channel) => onClick(videoPlayer.id, channel)}
              />
            )}
          </div>
        ))}
      </main>
      {alreadyStreamLoaded && (
        <aside tw="col-span-1 gap-2 h-full">
          {videoPlayers.map(({ id, channel, loaded }) =>
            channel && loaded ? (
              <iframe
                key={id}
                id={id}
                src={buildChatUrl(channel)}
                height="100%"
                width="100%"
              ></iframe>
            ) : null
          )}
        </aside>
      )}
    </div>
  );
}
