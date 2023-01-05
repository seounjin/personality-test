import { DefaultTheme, css, CSSProp } from 'styled-components';

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
    lightGray: '#a2a2a2',
    gray_background: '#F2F2F2',
    progressBarColor: '#424874',
    basicProgressBarColor: '#a2a2a2',
    stepColor: '#538AB9',
    helperTextColor: '#f44336',
    stepBackgroundColor: '#fff',
    stepperColor: '#424874',
    fillStepperColor: '#a2a2a2',
    stepperFontColor: '#a2a2a2',
    basicFontColor: '#1b300a',
    buttonColor: '#424874',
    buttonDisabledColor: '#A6B1E1',
    buttonHoverColor: '#DCD6F7',
    buttonFontColor: '#fff',
    textFiledBorderColor: '#424874',
    textFiledFocusColor: '#A6B1E1',
    textAreaFocusColor: '#A6B1E1',
    boxShadowBorderColor: '#424874',
    textBoxBorderColor: '#424874',
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
};
