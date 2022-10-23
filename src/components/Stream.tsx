import * as React from 'react';

import type { Streamer } from 'pages';

import { CloseButton } from 'components/CloseButton';
import { useStreamer } from 'hooks/useStreamer';
import { buildEmbed } from 'utils/buildEmbed';

export type StreamProps = {
  streamer: Streamer;
};

const Stream = ({ streamer }: StreamProps) => {
  const { removeStreamer } = useStreamer();
  const embedRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (embedRef.current.childElementCount === 0) {
      buildEmbed(streamer);
    }
  }, [streamer]);

  return (
    <li className="relative border-2 border-dashed border-gray-800 rounded flex items-center justify-center gap-1 group h-stream-item">
      <div ref={embedRef} id={streamer.id} className="w-full h-full" />
      <CloseButton onClick={() => removeStreamer(streamer.id)} />
    </li>
  );
};
export { Stream };
