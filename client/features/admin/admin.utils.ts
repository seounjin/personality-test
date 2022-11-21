import {
  ResultContent,
  ResultItem,
} from './container/ResultCard/ResultCard.type';
import { SelectItem } from './container/SelectCard/SelectCard.type';

interface ParseSelectItems {
  question: string;
  questionvalue: string;
  selected: string;
  selectedvalue: string;
}

export const createResultItems = (
  items: SelectItem[],
  itemLength: number,
): Array<ResultItem>[][] => {
  const parsedSelectItems = parseSelectItemsToArray(items);
  const res = setPermutation(itemLength);
  return parseResultItems(res, parsedSelectItems);
};

export const createResultContents = (itemLength: number): ResultContent[] => {
  const res = setPermutation(itemLength);
  return parseResultContents(res);
};

const parseSelectItemsToArray = (
  items: SelectItem[],
): Array<ParseSelectItems>[] =>
  items.map(({ question, select_1, select_2 }, index) => [
    {
      question: `${index + 1}번질문에 대한`,
      questionvalue: question,
      selected: '1번선택',
      selectedvalue: select_1,
    },
    {
      question: `${index + 1}번질문에 대한`,
      questionvalue: question,
      selected: '2번선택',
      selectedvalue: select_2,
    },
  ]);

const setPermutation = (itemLength: number): number[][] => {
  const res = [];
  permutation(0, [], itemLength, res);
  return res;
};

const permutation = (
  cnt: number,
  array: number[],
  itemLength: number,
  resultArray: number[][],
) => {
  if (cnt === itemLength) {
    resultArray.push([...array]);
    return;
  }

  for (let index = 0; index < 2; index++) {
    array.push(index);
    permutation(cnt + 1, array, itemLength, resultArray);
    array.pop();
  }
};

const parseResultItems = (
  permutation: number[][],
  parsedSelectItems: Array<ParseSelectItems>[],
): Array<ResultItem>[][] =>
  permutation.map((numArray) =>
    numArray.map((num, index) => {
      const { question, questionvalue, selected, selectedvalue } =
        parsedSelectItems[index][num];

      return [
        { label: question, defaultValue: questionvalue },
        { label: selected, defaultValue: selectedvalue },
      ];
    }),
  );

const combineNum = (data: number[]): string =>
  data.reduce((sum, num, index) => (sum += `${num + index * 2}`), '');

const parseResultContents = (permutation: number[][]): ResultContent[] =>
  permutation.map((data) => ({
    id: combineNum(data),
    who: '',
    content: '',
  }));
