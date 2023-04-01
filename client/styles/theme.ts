import { DefaultTheme, css, CSSProp, keyframes } from 'styled-components';

const deviceSizes = {
  mobile: '425',
  tablet: '768',
  laptop: '1024',
};

export const theme: DefaultTheme = {
  colors: {
    black: '#000',
    white: '#ffffff',
    yellow: '#edb83c',
    orange: '#eb7952',
    lightGray: '#DDDDDD',
    gray_background: '#F5F5F5',
    progressBarColor: '#594545',
    basicProgressBarColor: '#DDDDDD',
    stepColor: '#538AB9',
    helperTextColor: '#f44336',
    stepBackgroundColor: '#fff',
    stepperColor: '#594545',
    fillStepperColor: '#DDDDDD',
    stepperFontColor: '#b1b1b1',
    basicFontColor: '#1b300a',
    buttonColor: '#594545',
    buttonDisabledColor: '#E3CAA5',
    buttonHoverColor: '#7e5e5e',
    buttonFontColor: '#fff',
    textFiledBorderColor: '#594545',
    textFiledFocusColor: '#E3CAA5',
    textAreaFocusColor: '#E3CAA5',
    boxShadowBorderColor: '#594545',
    textBoxBorderColor: '#594545',
    lastScreenTitleColor: '#FF9494',
    lastScreenContentColor: '#FFE3E1',
    angleLeftSolidColor: '#594545',
    angleRightSolidColor: '#594545',
    questionMarkColor: '#594545',
    loginFormButtonColor: '#594545',
    loginFormLinkTextColor: '#333333',
    loginFormLinkTextHoverColor: '#9E7676',
    mypageBackgroundColor: '#f8f9fd',
    sideBarMenuButtonColor: '#DDDDDD',
    testTypeButtonColor: '#9E7676',
    startButtonColor: '#FF9494',
    backgroundImageColor: '#FFF5E4',
    mainPageSubColor: '#ffd1d1',
    ovalButtonHoverColor: '#ffd1d1',
    optionButtonColor: '#f1f1f1',
    scoreTypeTagBgColor: '#ffd1d1',
    mbtiTypeTagBgColor: '#FFF5E4',
    noButtonColor: '#cebaba',
    noButtonHoverColor: '#c4acac',
    previewButtonColor: '#808080',
    detailButtonColor: '#594545',
    detailButtonHoverColor: '#cebaba',
    'true-or-falseTypeTagBgColor': '#DAEAF1',
    skeletionColor: '#bfbfbf',
  },

  device: {
    mobile: (literals: TemplateStringsArray, ...args: string[]): CSSProp =>
      css`
        @media only screen and (max-width: ${deviceSizes.mobile}px) {
          ${css(literals, ...args)}
        }
      `,
    tablet: (literals: TemplateStringsArray, ...args: string[]): CSSProp =>
      css`
        @media only screen and (max-width: ${deviceSizes.tablet}px) {
          ${css(literals, ...args)}
        }
      `,
    laptop: (literals: TemplateStringsArray, ...args: string[]): CSSProp =>
      css`
        @media only screen and (max-width: ${deviceSizes.laptop}px) {
          ${css(literals, ...args)}
        }
      `,
  },
  boxShadow: (): CSSProp =>
    css`rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, ${(props) =>
      props.theme.colors.boxShadowBorderColor} 0px 0px 0px 2px`,

  skeletonGradation: (): CSSProp =>
    css`
      ${pulse} 2s ease-in-out infinite
    `,
};

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
    }
`;
