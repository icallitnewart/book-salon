import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --desktop-screen-width: 1200px;
    
    --main-color-green: #5cf636;
		--main-color-black: #000000;
		--sub-color-green: #00f799;
    --sub-color-darkgreen: #0EBF7C;
    --bg-color-grey-1: #f8f8f8;

    --main-font-eng: 'Montserrat', sans-serif;
    --main-font-kor: 'Noto Sans KR', sans-serif;

    --header-height: 80px;
  }

  html {
    font-size: 10px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
