export interface Step {
  name: string;
  Element: ({ handleNext }: StepComponentProps) => JSX.Element;
}

type StepComponentProps = { handleNext?: () => void };
