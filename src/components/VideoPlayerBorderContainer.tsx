import 'twin.macro';
import { ReactNode } from 'react';

export const VideoPlayerBorderContainer = ({
  children
}: {
  children: ReactNode;
}) => (
  <div
    className="group"
    tw="relative border-2 border-dashed border-gray-800 rounded flex items-center justify-center"
  >
    {children}
  </div>
);
