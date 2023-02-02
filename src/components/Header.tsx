import { Tooltip } from 'flowbite-react';
import { ChevronFirst, ChevronLast, Plus, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';
import { nanoid } from 'nanoid';

import { useStore } from '@src/store/store';

import { KeyShortcut } from '@components/KeyShortchut';
import { StreamButton } from '@components/StreamButton';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addChannelInputRef = useRef<HTMLInputElement | null>(null);
  const [channel, setChannel] = useState('');
  const isAdding = useStore((state) => state.isAdding);
  const setIsAdding = useStore((state) => state.setIsAdding);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const setIsChatOpen = useStore((state) => state.setIsChatOpen);
  const streamers = useStore((state) => [...state.streamers.values()]);
  const selectedStream = useStore((state) => state.selectedStream);
  const addStreamer = useStore((state) => state.addStreamer);

  useEffect(() => {
    if (addChannelInputRef.current) {
      addChannelInputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channel) return;

    addStreamer({ id: nanoid(), channel });

    const route = pathname
      .split('/')
      .filter(Boolean)
      .concat([channel])
      .join('/');

    router.push(`/${route}`);
  };

  return (
    <header className="flex items-center flex-wrap gap-2 lg:flex-nowrap">
      <div className="inline-flex flex-1 border border-transparent py-1 gap-2">
        <div className="hidden lg:flex lg:gap-2">
          {streamers.map((streamer, index) => (
            <StreamButton
              active={streamer.id === selectedStream?.id}
              key={streamer.id}
            >
              {/* <GripVertical className="h-4 w-4" size={16} /> */}
              <p>{streamer.channel}</p>
              <KeyShortcut>{++index}</KeyShortcut>
            </StreamButton>
          ))}
        </div>

        <StreamButton
          onClick={() => {
            setIsAdding(!isAdding);
          }}
          className="rounded-md border border-slate-800"
        >
          {isAdding ? (
            <X className="h-4 w-4" size={16} />
          ) : (
            <>
              <Plus className="h-4 w-4" size={16} />
              <span className="text-xs">Add Stream</span>
              <KeyShortcut>Ctrl+K</KeyShortcut>
            </>
          )}
        </StreamButton>

        <form
          className={clsx('group', {
            hidden: !isAdding,
            flex: isAdding,
          })}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            ref={addChannelInputRef}
            type="text"
            placeholder="Search stream..."
            className="transition peer placeholder-white p-2 text-white border border-slate-800 rounded-l-md border-r-0 bg-transparent group-hover:border-slate-700 sm:text-xs focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(ev) => setChannel(ev.target.value)}
          />

          <StreamButton
            type="submit"
            className="rounded-tl-none rounded-bl-none border border-indigo-800 bg-indigo-600 border-l-0 hover:bg-slate-700 group-hover:border-slate-700 peer-focus:rounded-r-md peer-focus:border-indigo-500 peer-focus:ring-1"
          >
            <Plus className="h-4 w-4" size={16} />
          </StreamButton>
        </form>
      </div>
      {selectedStream && (
        <div className="flex relative">
          <Tooltip
            content={isChatOpen ? 'Expand' : 'Collapse'}
            placement="left"
            style="light"
          >
            <StreamButton
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              {isChatOpen ? (
                <ChevronFirst className="h-4 w-4" size={16} />
              ) : (
                <ChevronLast className="h-4 w-4" size={16} />
              )}
            </StreamButton>
          </Tooltip>
        </div>
      )}
    </header>
  );
};
