import tw from 'twin.macro';
import type { ReactNode } from 'react';

export type ButtonProps = {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
  closeChat: () => void;
};

export const Button = ({
  active = false,
  onClick,
  closeChat,
  children
}: ButtonProps) => (
  <button
    onClick={onClick}
    css={[
      tw`relative p-2 text-sm bg-indigo-400 hover:bg-indigo-600`,
      active && tw`bg-indigo-600 hover:bg-indigo-400`
    ]}
  >
    <span tw="absolute right-1 top-1 hover:text-indigo-900" onClick={closeChat}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        tw="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
    {children}
  </button>
);
