import { createGlobalStyle } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  * {
    transition-property: color, background-color, border-color;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased bg-gray-900`}
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);
