import { createGlobalStyle, css } from 'styled-components';

export const fontFaceRules = `
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter.var.woff2") format("woff2 supports variations"),
         url("/fonts/Inter.var.woff2") format("woff2-variations");
    font-weight: 100 900;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    font-size: 16px;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
  }

  input, button {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }  

  button {
    border: none;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    appearance: none;    
  }

  .container {
    width: 90%;
    max-width: 1255px;
    margin: auto;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const sizes = {
  '1275': 1275,
  '1150': 1150,
  '1050': 1050,
  '600': 600
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args: any[]) => css`
    @media (max-width: ${sizes[label] / 16}em) {      
      ${css.call(undefined, ...args)}
    }
  `;

  return acc;
}, {});

export default GlobalStyle;