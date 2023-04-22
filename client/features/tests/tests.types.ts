export interface Step {
  name?: string;
  Element: ({ handleNext }: StepComponentProps) => JSX.Element;
}

type StepComponentProps = { handleNext?: () => void };

export interface ResultFormItem {
  resultContent: string;
  explanationContent: string;
  resultImageUrl: string;
}

export interface WeightedScoreItem {
  resultContent: string;
  score: number;
}

export interface OptionItems {
  option: string;
  weightedScoreItems?: WeightedScoreItem[];
}

export interface SelectFormItems {
  question: string;
  optionItems: OptionItems[];
}

export interface WeightedScore {
  [key: string]: number;
}

export interface BaseTestItems {
  title: string;
  subTitle: string;
  explain: string;
  id?: string;
  testType: string;
  isPublic: boolean;
}

export type TestDisposition = 'temporary' | 'real' | null;

export interface Manual {
  title: string;
  content: string;
}

export interface ManualItem {
  data: Manual[];
  firstStep: number;
  lastStep: number;
}

export interface CompressedResult {
  compressedFile: File;
  imageBase64Data: string;
}

export type ScoreTestResultImageUrl =
  `scoreTestResultFormItems.${number}.resultImageUrl`;

export type MbtiTestResultImageUrl =
  `mbtiTestResultFormItems.${number}.resultImageUrl`;
