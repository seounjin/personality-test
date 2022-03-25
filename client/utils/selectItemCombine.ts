import {
  Items,
  ResultContents,
  ResultItems,
} from '../components/SelectContainer/type';

type SelectItemCombine = {
  resultItems: Array<ResultItems>[];
  resultContent: ResultContents[];
};

const selectItemCombine = (
  itemLength: number,
  items: Items[],
): SelectItemCombine => {
  let cnt = -1;
  const tempArray = Array(itemLength)
    .fill(null)
    .map(() => {
      return [0, 0].map(() => {
        cnt += 1;
        return cnt;
      });
    });

  const selectNumber = [];
  const calc = (x, cnt, sum) => {
    if (cnt == itemLength) {
      const data = sum.map((data) => data);
      selectNumber.push(data);
      return;
    }

    for (let index = 0; index < 2; index++) {
      sum.push(tempArray[x][index]);
      calc(x + 1, cnt + 1, sum);
      sum.pop();
    }
  };
  calc(0, 0, []);
  const resultItems = selectNumber.map((data) => {
    return data.map((data2) => {
      const questionNumber = Math.floor(data2 / 2);
      const selectNumber = data2 % 2;
      const select = selectNumber === 0 ? 'select_1' : 'select_2';

      const content = items[questionNumber][select];
      const question = items[Math.floor(data2 / 2)]['question'];

      return {
        questionNumber: questionNumber + 1,
        selectNumber: selectNumber + 1,
        question: question,
        content: content,
      };
    });
  });

  const resultContent = selectNumber.map((data) => {
    return { id: data.join(''), who: '', content: '' };
  });

  return { resultItems: resultItems, resultContent: resultContent };
};

export default selectItemCombine;
