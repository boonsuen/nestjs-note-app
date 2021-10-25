import { createGlobalStyle, css } from 'styled-components';

export const fontFaceRules = `
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter.var.woff2') format('woff2 supports variations'),
      url('/fonts/Inter.var.woff2') format('woff2-variations');
    font-weight: 100 900;
  }
`;

const nProgressStyle = css`
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #1890ff;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 1px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px red, 0 0 5px red;
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: #1890ff;
    border-left-color: #1890ff;
    border-radius: 50%;

    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${props => nProgressStyle}

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
  '600': 600,
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
