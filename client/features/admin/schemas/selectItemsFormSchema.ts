import * as yup from 'yup';

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup
      .string()
      .required('한 글자 이상 채워주세요')
      .max(20, '최대 20글자 이하로 입력해 주세요'),
    weightedScoreItems: yup
      .array()
      .of(
        yup.object().shape({
          score: yup.number(),
        }),
      )
      .test('weightedScoreValidation', '하나 이상 점수를 주세요', (items) =>
        items.some(({ score }) => score),
      ),
  }),
);

export const selectItemsFormSchema = yup.object({
  selectFormItems: yup.array().of(
    yup.object().shape({
      question: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(20, '최대 20글자 이하로 입력해 주세요'),
      optionItems: optionItemsArray,
    }),
  ),
});
