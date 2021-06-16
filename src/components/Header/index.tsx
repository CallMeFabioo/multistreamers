import 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';

import { SearchInput } from 'components/SearchInput';

export type HeaderProps = {
  hideSearchInput: boolean;
  onSearchClick: (channel: string) => void;
};

export const Header = ({ hideSearchInput, onSearchClick }: HeaderProps) => {
  return (
    <header tw="relative grid items-center grid-cols-2 p-2">
      <Link href="/" passHref>
        <a tw="flex place-self-start">
          <Image src="/icon.svg" width={40} height={40} />
        </a>
      </Link>

      {hideSearchInput && (
        <SearchInput tw="flex justify-center" onClick={onSearchClick} />
      )}
    </header>
  );
};
