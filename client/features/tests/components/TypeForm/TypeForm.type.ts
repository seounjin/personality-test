export interface TypeFormItems {
  typeContent: string;
  explanationContent: string;
}

export type TypeItemValues = {
  typeFormItems: TypeFormItems[];
};

export interface TypeDictionary {
  [key: string]: string;
}
