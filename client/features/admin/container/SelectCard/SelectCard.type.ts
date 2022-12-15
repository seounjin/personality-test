interface OptionItems {
  type: string;
  label: string;
  option: string;
}

export interface SelectItems {
  type: string;
  label: string;
  question: string;
  optionItems: OptionItems[];
}
