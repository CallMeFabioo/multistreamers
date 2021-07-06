import * as React from 'react';
import tw from 'twin.macro';

import type { Streamer } from 'pages';

import { CloseButton } from 'components/CloseButton';
import { useStreamer } from 'hooks/useStreamer';
import { buildEmbed } from 'utils/buildEmbed';

export type StreamProps = {
  type?: 'main' | 'default';
  streamer: Streamer;
};

const Container = tw.li`relative border-2 border-dashed border-gray-800 rounded flex items-center justify-center`;
const BigStream = tw(Container)`h-[520px] col-span-3 row-span-2`;
const DefaultStream = tw(Container)`self-end h-64`;

const Stream = ({ type = 'default', streamer }: StreamProps) => {
  const { removeStreamer, updateStreamer } = useStreamer();
  const Component = type === 'default' ? DefaultStream : BigStream;

  React.useEffect(() => {
    buildEmbed(streamer);
    // updateStreamer({ ...streamer, loaded: true });
    if (!streamer.loaded) {
      console.log('buildEmbed', { streamer });
    }
  }, [streamer, updateStreamer]);

  return (
    <Component className="group">
      <div id={streamer.id} tw="w-full h-full"></div>
      <CloseButton onClick={() => removeStreamer(streamer.id)} />
    </Component>
  );
};
export { Stream };
