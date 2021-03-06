import 'twin.macro';
import React, { useRef, useState } from 'react';

export type SearchInputProps = {
  onClick: (channel: string) => void;
};

export const SearchInput = ({ onClick, ...props }: SearchInputProps) => {
  const [channel, setChannel] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }

    setChannel(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channel) {
      setError(true);
      return;
    }

    setChannel('');
    onClick(channel);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      {...props}
      className="group"
      tw="flex flex-1 justify-center"
    >
      <input
        ref={inputRef}
        type="text"
        tw="text-gray-200 bg-gray-900 block border-r-0 rounded-md rounded-r-none border-gray-500 shadow-sm group-hocus:(ring ring-indigo-700) focus:border-indigo-300 focus:(ring ring-indigo-700 ring-opacity-5 placeholder-gray-200)"
        placeholder="Search a twitch streamer"
        value={channel}
        onChange={onChange}
      />
      <button
        type="submit"
        tw="px-4 py-2 border rounded-md rounded-l-none border-transparent text-sm font-medium text-white bg-indigo-600 group-hocus:(ring ring-indigo-700) hover:bg-indigo-700 focus:(outline-none ring ring-indigo-500)"
      >
        <svg
          tw="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      {error && (
        <p tw="text-xs text-red-400 font-bold mt-2">
          Please, search a Twitch streamer!
        </p>
      )}
    </form>
  );
};
