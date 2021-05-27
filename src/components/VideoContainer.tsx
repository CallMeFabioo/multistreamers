import tw, { styled } from 'twin.macro';
import type { ReactNode } from 'react';

export type VideoContainerProps = {
  videos: number;
  hasChat: boolean;
  isSearchInputHided: boolean;
  children: ReactNode;
};

const Container = styled.main<{ rows: number; cols: number }>(
  ({ rows, cols }) => ({
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr));`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr));`
  })
);

export const VideoContainer = ({
  videos,
  hasChat,
  isSearchInputHided,
  children
}: VideoContainerProps) => {
  let rows, cols;

  if (videos === 1 && isSearchInputHided) {
    rows = 1;
    cols = 1;
  } else if (videos < 4 && videos >= 1) {
    rows = 2;
    cols = 2;
  } else if (videos >= 4) {
    rows = 3;
    cols = 3;
  } else {
    rows = 1;
    cols = 1;
  }

  return (
    <Container
      rows={rows}
      cols={cols}
      css={[
        tw`relative grid h-full col-span-2 gap-2`,
        hasChat && tw`col-span-3`
      ]}
    >
      {children}
    </Container>
  );
};
