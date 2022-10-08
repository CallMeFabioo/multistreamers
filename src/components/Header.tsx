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
    <header className="flex items-center flex-nowrap p-2">
      <div className="flex-1">
        <Link href="/" passHref>
          <a className="flex-1">
            <Image alt="" src="/icon.svg" width={40} height={40} />
          </a>
        </Link>
      </div>

      <SearchInput onClick={onSearch} />

      <div className="flex-1 text-right text-white text-xs font-mono">
        {streamers.length > 0 && (
          <button onClick={toggleChat}>Toggle chat</button>
        )}
      </div>
    </header>
  );
};
