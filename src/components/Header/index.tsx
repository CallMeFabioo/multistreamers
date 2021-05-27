import 'twin.macro';
import Link from 'next/link';

import { SearchInput } from 'components/SearchInput';

export type HeaderProps = {
  hideSearchInput: boolean;
  onSearchClick: (channel: string) => void;
};

export const Header = ({ hideSearchInput, onSearchClick }: HeaderProps) => {
  return (
    <header tw="relative grid items-center grid-cols-3 p-2">
      <Link href="/">
        <a>Multistreamers</a>
      </Link>

      {hideSearchInput && (
        <SearchInput tw="flex justify-center" onClick={onSearchClick} />
      )}
    </header>
  );
};
