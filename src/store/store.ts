import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import type { Streamer } from '@src/types';

export type Store = {
  streamers: Map<string, Streamer>;
  selectedStream?: Streamer | null;
  isAdding: boolean;
  isChatOpen: boolean;
  setSelectedStream(streamer: Streamer): void;
  setIsAdding(isAdding: boolean): void;
  setIsChatOpen(isChatOpen: boolean): void;
  addStreamer(streamer: Streamer | Streamer[]): void;
  removeStreamer(id: string): void;
};

export const useStore = create<Store>((set) => ({
  streamers: new Map(),
  selectedStream: null,
  isAdding: false,
  isChatOpen: false,
  setSelectedStream: (stream) => set(() => ({ selectedStream: stream })),
  setIsAdding: (isAdding) => set(() => ({ isAdding })),
  setIsChatOpen: (isChatOpen) => set(() => ({ isChatOpen })),
  addStreamer: (streamer: Streamer) =>
    set((state) => ({
      streamers: state.streamers.set(streamer.channel, streamer),
    })),
  removeStreamer: (streamerId: string) =>
    set((state) => {
      state.streamers.delete(streamerId);

      return { streamers: state.streamers };
    }),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore);
}
