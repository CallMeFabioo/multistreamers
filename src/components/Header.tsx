import Link from 'next/link';
import Image from 'next/future/image';

import { SearchInput } from 'components/SearchInput';
import { useStreamer } from 'hooks/useStreamer';

export type HeaderProps = {
  onSearch(channel: string): void;
  toggleChat(): void;
};

export const Header = ({ onSearch, toggleChat }: HeaderProps) => {
  const { streamers } = useStreamer();

  return (
    <header className="flex items-center justify-around flex-nowrap p-2">
      <Link href="/" passHref>
        <a>
          <Image alt="" src="/icon.svg" width={40} height={40} />
        </a>
      </Link>

      <SearchInput onClick={onSearch} />

      <div className="text-right text-white text-xs font-mono">
        {streamers.length > 0 && (
          <button onClick={toggleChat}>Toggle chat</button>
        )}
      </div>
    </header>
  );
};
