import * as S from './styles';

export type MainProps = {
  title?: string;
  description?: string;
};

export const Main = ({
  title = 'Next.js Boilerplate',
  description = 'Boilerplate utilizando TypeScript, React, NextJS e Styled Components'
}: MainProps) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
  </S.Wrapper>
);
