import type { Streamer } from 'pages';

import { buildChatUrl } from 'utils/buildChatUrl';

type Props = {
  streamer: Streamer;
};
export const StreamerChat = ({ streamer }: Props) => {
  if (!streamer) return null;

  return (
    <div className="absolute w-full h-chat">
      <iframe src={buildChatUrl(streamer.channel)} height="100%" width="100%" />
    </div>
  );
};