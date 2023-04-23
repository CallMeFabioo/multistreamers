import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Check, ChevronsUpDown } from 'lucide-react';

import { useStore } from '@src/store/store';

export const StreamChatSelectInput = () => {
  const streamers = useStore((state) => [...state.streamers.values()]);
  const selectedStream = useStore((state) => state.selectedStream);
  const setSelectedStream = useStore((state) => state.setSelectedStream);

  return (
    <div className="relative my-4 w-80 lg:my-0">
      <Listbox value={selectedStream} onChange={setSelectedStream}>
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left shadow-md hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selectedStream.channel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {streamers.map((streamer) => (
              <Listbox.Option
                key={streamer.id}
                value={streamer}
                className={({ active }) =>
                  clsx('relative cursor-default select-none py-2 pl-10 pr-4', {
                    'bg-slate-800': active,
                    'text-gray-900': !active,
                  })
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx('block truncate text-white', {
                        'font-medium': selected,
                        'font-normal': !selected,
                      })}
                    >
                      {streamer.channel}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
