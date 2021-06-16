import tw from 'twin.macro';
import type { ReactNode } from 'react';

export type ContainerProps = {
  rows?: number;
  hasChat?: boolean;
  children: ReactNode;
};

const Container = ({ hasChat, children }: ContainerProps) => (
  <div
    css={[
      tw`grid h-[calc(100vh - 56px)] gap-2 p-2 text-white transition-all`,
      hasChat && tw`grid-cols-4`
    ]}
  >
    {children}
  </div>
);

const Border = ({ children }: { children: ReactNode }) => (
  <div
    className="group"
    tw="relative border-2 border-dashed border-gray-800 rounded flex items-center justify-center"
  >
    {children}
  </div>
);

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      tw="absolute transition-opacity top-2 right-2 text-gray-500 opacity-5 hover:text-gray-200 group-hocus:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        tw="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

Container.Border = Border;
Container.CloseButton = CloseButton;

export { Container };
