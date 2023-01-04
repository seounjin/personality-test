import * as yup from 'yup';

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup.string().required('한 글자 이상 채워주세요'),
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
