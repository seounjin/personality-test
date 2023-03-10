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
      lastScreenTitleColor: string;
      lastScreenContentColor: string;
      angleRightSolidColor: string;
      angleLeftSolidColor: string;
      questionMarkColor: string;
      loginFormButtonColor: string;
      loginFormLinkTextColor: string;
      loginFormLinkTextHoverColor: string;
      mypageBackgroundColor: string;
      sideBarMenuButtonColor: string;
      testTypeButtonColor: string;
      startButtonColor: string;
      mainPageSubColor: string;
      ovalButtonHoverColor: string;
      optionButtonColor: string;
      scoreTypeTagBgColor: string;
      mbtiTypeTagBgColor: string;
      noButtonColor: string;
      noButtonHoverColor: string;
    };

    device: {
      mobile: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      tablet: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
      laptop: (literals: TemplateStringsArray, ...args: string[]) => CSSProp;
    };
    boxShadow: () => CSSProp;
  }
}
