import * as yup from 'yup';

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup.string().required('한 글자 이상 채워주세요'),
    weightCheckboxes: yup
      .array()
      .of(
        yup.object().shape({
          isChecked: yup.boolean(),
        }),
      )
      .test('checkboxValidation', '하나 이상 체크해주세요', (items) => {
        return items.some(({ isChecked }) => isChecked);
      }),
  }),
);

export const selectItemsFormSchema = yup.object({
  selectItems: yup.array().of(
    yup.object().shape({
      question: yup.string().required('한 글자 이상 채워 주세요'),
      optionItems: optionItemsArray,
    }),
  ),
});
