import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
    margin: 0 auto;
    width: 100%;
    background: ${({ theme }) => theme.colors.background.standard};
  }

  section {
    max-width: 1440px;
    margin: 0 auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
