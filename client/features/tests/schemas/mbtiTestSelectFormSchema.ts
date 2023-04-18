import * as yup from 'yup';

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup
      .string()
      .required('한 글자 이상 채워주세요')
      .max(50, '최대 50글자 이하로 입력해 주세요'),
  }),
);

export const mbtiTestSelectFormSchema = yup.object({
  mbtiTestSelectFormItems: yup.array().of(
    yup.object().shape({
      question: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(50, '최대 50글자 이하로 입력해 주세요'),
      optionItems: optionItemsArray,
    }),
  ),
});
