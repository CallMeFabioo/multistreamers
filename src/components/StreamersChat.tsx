import tw from 'twin.macro';
import { useState } from 'react';
import { StreamersChatButton } from './StreamersChatButton';
import { buildChatUrl } from 'lib/buildChatUrl';

export type VideoPlayer = {
  id: string;
  channel: string;
  loaded: boolean;
};

export type StreamersChatProps = {
  videoPlayers: Array<VideoPlayer>;
};

export const StreamersChat = ({ videoPlayers }: StreamersChatProps) => {
  const [active, setActive] = useState(
    () => videoPlayers[videoPlayers.length - 1].id
  );

  return (
    <aside tw="col-span-1 gap-2 h-full relative">
      <div tw="grid grid-cols-4">
        {videoPlayers.map(({ id, channel }) => (
          <StreamersChatButton
            key={id}
            active={active === id}
            onClick={() => setActive(id)}
          >
            {channel}
          </StreamersChatButton>
        ))}
      </div>

      {videoPlayers.map(({ id, channel, loaded }) =>
        channel && loaded ? (
          <div
            key={id}
            tw="absolute w-full opacity-0"
            css={[
              { height: 'calc(100vh - 52px)' },
              active === id ? tw`opacity-100` : null
            ]}
          >
            <iframe
              key={id}
              id={id}
              src={buildChatUrl(channel)}
              height="100%"
              width="100%"
            ></iframe>
          </div>
        ) : null
      )}
    </aside>
  );
};
