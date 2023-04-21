'use client';

import { useHotkeys } from 'react-hotkeys-hook';

import { useStore } from '@src/store/store';

import { Header } from '@components/Header';

import { HomePage } from './HomePage';
import { MultiStreamers } from './StreamersPage';

type Props = {
  params: { streamers?: string[] };
};

export default function StreamersPage({ params }: Props) {
  const isAdding = useStore((state) => state.isAdding);
  const streamers = useStore((state) => state.streamers);
  const setIsAdding = useStore((state) => state.setIsAdding);
  const setSelectedStream = useStore((state) => state.setSelectedStream);
  throw new Error('Eita');

  useHotkeys(
    'ctrl+k',
    () => {
      setIsAdding(!isAdding);
    },
    { preventDefault: true, enableOnFormTags: ['input'] },
    [isAdding],
  );

  useHotkeys(
    [...streamers].map((_, index) => `${++index}`),
    (event) => {
      const selectedStream = [...streamers][+event.key - 1][1];

      if (selectedStream) {
        setSelectedStream(selectedStream);
      }
    },
    { preventDefault: true, enableOnFormTags: ['input'] },
    [isAdding],
  );

  return (
    <>
      <Header />

      {params?.streamers?.length > 0 ? (
        <MultiStreamers streams={params.streamers} />
      ) : (
        <HomePage />
      )}
    </>
  );
}
