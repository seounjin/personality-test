import { TrueOrFalseSelectFormItems } from './container/SetTureOrFalseSelectFormItems/SetTureOrFalseSelectFormItems.type';
import { TrueOrFalseResultFormItems } from './container/TrueOrFalseResultFormSection/TrueOrFalseResultFormSection.type';

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

export const createTrueOrFalseResultFormItems = (
  trueOrFalseSelectFormItems: TrueOrFalseSelectFormItems[],
  trueOrFalseResultFormItems: TrueOrFalseResultFormItems[] = [],
) => {
  const array = createArray(trueOrFalseSelectFormItems);

  const res = combination(array);

  return res.map((combNumberItem, index) => {
    return {
      typeContent: trueOrFalseResultFormItems[index]
        ? trueOrFalseResultFormItems[index].typeContent
        : '',
      explanationContent: trueOrFalseResultFormItems[index]
        ? trueOrFalseResultFormItems[index].explanationContent
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
