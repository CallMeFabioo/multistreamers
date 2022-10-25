import Link from 'next/link';
import Image from 'next/image';

import { SearchInput } from 'components/SearchInput';
import { useStreamer } from 'hooks/useStreamer';

export type HeaderProps = {
  onSearch(channel: string): void;
  toggleChat(): void;
};

export const Header = ({ onSearch, toggleChat }: HeaderProps) => {
  const { streamers } = useStreamer();

  return (
    <header className="flex items-center justify-around flex-wrap gap-2 lg:flex-nowrap p-2">
      <Link href="/" passHref className="w-10 h-10">
        <Image alt="" src="/icon.svg" width={40} height={40} />
      </Link>

      <SearchInput onClick={onSearch} />

      <div className="mt-4 lg:mt-0 text-right text-white text-xs font-mono">
        {streamers.length > 0 && (
          <button onClick={toggleChat}>Toggle chat</button>
        )}
      </div>
    </header>
  );
};
