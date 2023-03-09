import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { pretendardFonts } from '../public/fonts/Pretendard/pretendardFonts';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  *{
    box-sizing: border-box;
  }
  
  html {
    font-size: 62.5%;
    min-width: 320px;
    height: 100%;
    font-family: ${pretendardFonts.style.fontFamily}, sans-serif; 

    button:hover{
      cursor: pointer;
    }
    body {
      height:100%;
    }
    #__next {
      height: 100%;
    }
}`;
