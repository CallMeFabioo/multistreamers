import tw from 'twin.macro';

import type { Streamer } from 'pages';

import { buildChatUrl } from 'utils/buildChatUrl';

type Props = {
  streamer: Streamer;
};
export const StreamerChat = ({ streamer }: Props) => {
  if (!streamer) return null;

  return (
    <aside tw="flex-1 relative max-w-[340px]">
      <div tw="absolute w-full" css={[tw`height[calc(100vh - 70px)]`]}>
        <iframe
          src={buildChatUrl(streamer.channel)}
          height="100%"
          width="100%"
        ></iframe>
      </div>
    </aside>
  );
};
