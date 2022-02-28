import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      yellow: string;
      orange: string;
      gray: string;
      gray_background: string;
    };
  }
}
