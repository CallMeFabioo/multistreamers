import { ReactNode } from 'react';
import tw from 'twin.macro';

export type StreamersChatButtonProps = {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
};

export const StreamersChatButton = ({
  active = false,
  onClick,
  children
}: StreamersChatButtonProps) => (
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
