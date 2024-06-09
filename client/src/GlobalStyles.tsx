import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+KR:wght@100..900&display=swap');
  
  ${reset}

  :root {
    --main-color-green: #5cf636;
		--main-color-black: #000000;
		--sub-color-green: #00f799;

    --main-font-eng: 'Montserrat', sans-serif;
    --main-font-kor: 'Noto Sans KR', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
  
`;

export default GlobalStyles;
