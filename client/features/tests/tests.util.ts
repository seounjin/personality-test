import {
  TrueOrFalseTestResultFormItem,
  TrueOrFalseTestSelectFormItem,
} from './container/TrueOrFalseTestContainer/trueOrFalseTest.type';

const createArray = (items) => {
  return items.map(({ question, optionItems }, questionIndex) => {
    return optionItems.map(({ id, option }, optionIndex) => {
      return {
        qusetionNumber: questionIndex + 1,
        question: question,
        optionId: id,
        optionNumber: optionIndex + 1,
        option: option,
      };
    });
  });
};

const combination = (array, prefix = [], res = []) => {
  if (array.length === 0) {
    res.push(prefix);
    return;
  }

  for (let index = 0; index < array[0].length; index++) {
    const newPrefix = prefix.concat(array[0][index]);
    combination(array.slice(1), newPrefix, res);
  }

  return res;
};

export const createTrueOrFalseTestResultFormItems = (
  trueOrFalseTestSelectFormItems: TrueOrFalseTestSelectFormItem[],
  trueOrFalseTestResultFormItems: TrueOrFalseTestResultFormItem[] = [],
) => {
  const array = createArray(trueOrFalseTestSelectFormItems);

  const res = combination(array);

  return res.map((combNumberItem, index) => {
    return {
      selectedOptionNumber: combNumberItem.reduce(
        (num, { optionNumber }, index) => {
          return (num += optionNumber);
        },
        '',
      ),
      resultContent: trueOrFalseTestResultFormItems[index]
        ? trueOrFalseTestResultFormItems[index].resultContent
        : '',
      explanationContent: trueOrFalseTestResultFormItems[index]
        ? trueOrFalseTestResultFormItems[index].explanationContent
        : '',
      selectedOption: combNumberItem.map(
        ({ qusetionNumber, question, optionNumber, optionId, option }) => ({
          qusetionNumber: qusetionNumber,
          question: question,
          optionNumber: optionNumber,
          optionId: optionId,
          option: option,
        }),
      ),
    };
  });
};

export const setWeightedScoreDictionary = (data) =>
  data.reduce((dic, { resultContent }) => ({ ...dic, [resultContent]: 0 }), {});
