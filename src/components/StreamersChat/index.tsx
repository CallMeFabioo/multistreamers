import tw from 'twin.macro';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { buildChatUrl } from 'lib/buildChatUrl';

export type VideoPlayer = {
  id: string;
  channel: string;
  loaded: boolean;
  isChatClosed: boolean | null;
};

export type ChatProps = {
  videoPlayers: Array<VideoPlayer>;
  closeChat: (channel: string) => void;
};

export const StreamersChat = ({ videoPlayers, closeChat }: ChatProps) => {
  const [active, setActive] = useState(
    () => videoPlayers[videoPlayers.length - 1]?.id
  );

  useEffect(() => {
    setActive(() => videoPlayers[videoPlayers.length - 1]?.id);
  }, [videoPlayers]);

  return (
    <aside tw="col-span-1 gap-2 h-full relative">
      <div tw="grid grid-cols-4">
        {videoPlayers
          .filter(({ isChatClosed }) => !isChatClosed)
          .map(({ id, channel }) => (
            <Button
              key={id}
              active={active === id}
              onClick={() => setActive(id)}
              closeChat={() => closeChat(id)}
            >
              {channel}
            </Button>
          ))}
      </div>

      {videoPlayers.map(({ id, channel, loaded, isChatClosed }) =>
        channel && loaded && !isChatClosed ? (
          <div
            key={id}
            tw="absolute w-full opacity-0"
            css={[
              tw`height[calc(100vh - 52px)]`,
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
