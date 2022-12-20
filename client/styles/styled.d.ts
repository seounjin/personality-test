import { CSSProp } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      yellow: string;
      orange: string;
      lightGray: string;
      gray_background: string;
      progressBarColor: string;
      stepColor: string;
      buttonHoverColor: string;
      helperTextColor: string;
    };

    device: {
      mobile: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      tablet: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      laptop: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
    };
  }
}
