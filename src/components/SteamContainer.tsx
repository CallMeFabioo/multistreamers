import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { Streamer } from '../types';
import { Stream } from './Stream';
import { StreamerChat } from './StreamerChat';

export type StreamContainerProps = {
  toggleChat: boolean;
  streamers: Streamer[];
};

export const StreamContainer = ({
  streamers,
  toggleChat
}: StreamContainerProps) => {
  const [selectedChat, setSelectedChat] = useState<Streamer>();

  useEffect(() => {
    setSelectedChat(streamers[0]);
  }, [streamers]);

  return (
    <main
      className={clsx('grid grid-cols-2 gap-2 p-2 text-white transition-all', {
        'lg:grid-cols-4': toggleChat,
        'lg:grid-cols-3': !toggleChat
      })}
    >
      <section className="flex-1 lg:col-span-3">
        <ul
          className={clsx('gap-1 relative grid h-full', {
            'lg:grid-cols-2':
              streamers.length % 2 === 0 || [1, 3].includes(streamers.length),
            'lg:grid-cols-3': streamers.length % 5 === 0
          })}
        >
          {streamers.map((streamer) => (
            <Stream key={streamer.id} streamer={streamer} />
          ))}
        </ul>
      </section>
      {streamers.length > 0 && toggleChat && (
        <aside className="flex-1 relative">
          <nav className="flex gap-1 mb-2 flex-wrap">
            {streamers.map((streamer) => (
              <button
                key={streamer.id}
                className={clsx(
                  'px-4 py-1 rounded bg-indigo-600 hover:bg-indigo-600 focus:outline-none border border-transparent',
                  {
                    'bg-indigo-700 ring ring-indigo-500':
                      streamer.id === selectedChat?.id
                  }
                )}
                onClick={() => setSelectedChat(streamer)}
              >
                {streamer.channel}
              </button>
            ))}
          </nav>
          <StreamerChat streamer={selectedChat} />
        </aside>
      )}
    </main>
  );
};
