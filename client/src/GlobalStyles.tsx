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

    --main-font-eng: 'Montserrat', sans-serif;
    --main-font-kor: 'Noto Sans KR', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
  
`;

export default GlobalStyles;
