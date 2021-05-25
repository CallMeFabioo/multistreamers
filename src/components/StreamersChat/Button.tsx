import tw from 'twin.macro';
import type { ReactNode } from 'react';

export type ButtonProps = {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ active = false, onClick, children }: ButtonProps) => (
  <button
    onClick={onClick}
    css={[
      tw`p-2 text-sm bg-indigo-400 hover:bg-indigo-600`,
      active && tw`bg-indigo-600 hover:bg-indigo-400`
    ]}
  >
    {children}
  </button>
);
