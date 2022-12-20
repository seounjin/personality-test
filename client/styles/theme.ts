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
    gray_background: '#f5f5f5',
    progressBarColor: '#538AB9',
    stepColor: '#538AB9',
    buttonHoverColor: '#c0c0c5',
    helperTextColor: '#f44336',
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
};
