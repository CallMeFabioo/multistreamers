import { useEffect } from 'react';

import clsx from 'clsx';

import { buildChatUrl } from '@utils/buildChatUrl';
import { buildEmbed } from '@utils/buildEmbed';

import { useStore } from '@src/store/store';

import { StreamChatSelectInput } from '@components/StreamChatSelectInput';

export const StreamContainer = () => {
  const streamers = useStore((state) => [...state.streamers.values()]);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const selectedStream = useStore((state) => state.selectedStream);
  const setSelectedStream = useStore((state) => state.setSelectedStream);

  useEffect(() => {
    if (!selectedStream && streamers.length > 0) {
      setSelectedStream(streamers[0]);
    }
  }, [selectedStream, setSelectedStream, streamers]);

  useEffect(() => {
    streamers.map((streamer) => buildEmbed(streamer));
  }, [streamers]);

  return (
    <main className="grid gap-2 h-stream-item text-white transition-all">
      <section className="flex flex-1 flex-col lg:flex-row">
        <ul
          className={clsx('grid flex-1 grid-cols-1', {
            'lg:grid-cols-1': [1].includes(streamers.length),
            'lg:grid-cols-2': [2, 3, 4].includes(streamers.length),
            'lg:grid-cols-3': [6].includes(streamers.length),
            'lg:grid-cols-6': [5].includes(streamers.length),
            'lg:grid-cols-8': [7].includes(streamers.length),
          })}
        >
          {streamers.map((streamer, index) => (
            <li
              key={streamer.id}
              className={clsx(
                'grid w-full gap-1 relative border-gray-800 rounded inset-0',
                {
                  'lg:col-span-3': index <= 1 && [5].includes(streamers.length),
                  'lg:col-span-2':
                    (index >= 2 && [5].includes(streamers.length)) ||
                    (index >= 3 && [7].includes(streamers.length)) ||
                    (index <= 2 && [7].includes(streamers.length)),
                },
              )}
            >
              <div id={streamer.id} className="w-full h-full" />
            </li>
          ))}
        </ul>
        {streamers.length > 0 && selectedStream && !isChatOpen && (
          <aside className="flex flex-col h-stream-item items-center min-w-[340px]">
            {selectedStream && <StreamChatSelectInput />}
            <div className="w-full flex-1 h-chat">
              <iframe
                src={buildChatUrl(selectedStream.channel)}
                allowFullScreen
                height="100%"
                width="100%"
              />
            </div>
          </aside>
        )}
      </section>
    </main>
  );
};
