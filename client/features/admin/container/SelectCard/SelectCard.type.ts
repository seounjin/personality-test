interface OptionItems {
  option: string;
}

export interface SelectItems {
  question: string;
  optionItems: OptionItems[];
  weightCheckboxes: Array<string>;
}
