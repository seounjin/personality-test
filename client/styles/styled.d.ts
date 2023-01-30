import { CSSProp } from 'styled-components';
import { isArgumentsObject } from 'util/types';
import { string } from 'yup';

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
      basicProgressBarColor: string;
      stepColor: string;
      fillStepperColor: string;
      stepperFontColor: string;
      buttonHoverColor: string;
      helperTextColor: string;
      stepBackgroundColor: string;
      stepperColor: string;
      basicFontColor: string;
      buttonColor: string;
      buttonFontColor: string;
      buttonDisabledColor: string;
      textFiledBorderColor: string;
      textFiledFocusColor: string;
      textAreaFocusColor: string;
      boxShadowBorderColor: string;
      textBoxBorderColor: string;
      backgroundImageColor: string;
      lastScreenTitleWrapperColor: string;
      angleRightSolidColor: string;
      angleLeftSolidColor: string;
      questionMarkColor: string;
    };

    device: {
      mobile: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      tablet: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      laptop: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
    };
    boxShadow: () => CSSProp;
  }
}
