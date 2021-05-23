import { ReactNode } from 'react';
import tw from 'twin.macro';

export type ContainerProps = {
  rows?: number;
  hasChat?: boolean;
  children: ReactNode;
};

export const Container = ({ hasChat, children }: ContainerProps) => (
  <div
    css={[
      tw`text-white h-full transition-all p-2 grid gap-2`,
      hasChat && tw`grid-cols-4`
    ]}
  >
    {children}
  </div>
);
