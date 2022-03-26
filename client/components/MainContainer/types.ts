export interface TestData {
  question: string;
  select_1: string;
  select_2: string;
  select_1_id: number;
  select_2_id: number;
}

export interface LastScreenData {
  who: string;
  content: string;
}

export interface MainStaticData {
  testData: TestData[];
  title: string;
  id: string;
}

export interface Error {
  statusCode: number;
  message: string;
}

export interface MainProps {
  mainStaticData?: MainStaticData;
  error?: Error;
}
