import * as React from 'react';

import type { Streamer } from 'routes';

type Context = {
  streamers: Streamer[];
  addStreamer(streamer: Streamer | Streamer[]): void;
  updateStreamer(streamer: Streamer): void;
  removeStreamer(id: string): void;
};

const NOOP = () => null;

const defaultValue = {
  streamers: [],
  addStreamer: (streamer: Streamer) => streamer,
  updateStreamer: NOOP,
  removeStreamer: NOOP
};

const StreamerContext = React.createContext<Context | null>(defaultValue);
StreamerContext.displayName = 'StreamerContext';

export const useStreamer = () => {
  const context = React.useContext(StreamerContext);

  if (!context) {
    throw new Error(`useStreamer must be used within a StreamerProvider`);
  }

  return context;
};

export const StreamerProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [streamers, setStreamers] = React.useState<Streamer[]>([]);

  const addStreamer = React.useCallback((streamer: Streamer | Streamer[]) => {
    setStreamers((prevState) => {
      return Array.isArray(streamer)
        ? [...prevState, ...streamer]
        : [...prevState, streamer];
    });
  }, []);

  const updateStreamer = React.useCallback((newStreamerState: Streamer) => {
    setStreamers((prevState) => {
      return prevState.map((streamer) => {
        if (newStreamerState.id === streamer.id) {
          return { ...streamer, ...newStreamerState };
        }

        return streamer;
      });
    });
  }, []);

  const removeStreamer = React.useCallback(
    (id: string) => {
      setStreamers(streamers.filter((s) => s.id !== id));
    },
    [streamers]
  );

  const value = React.useMemo(
    () => ({
      streamers,
      addStreamer,
      updateStreamer,
      removeStreamer
    }),
    [addStreamer, updateStreamer, removeStreamer, streamers]
  );

  return (
    <StreamerContext.Provider value={value}>
      {children}
    </StreamerContext.Provider>
  );
};
