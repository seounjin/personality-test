import yup from '../tests.yup';

export const trueOrFalseTestResultFormSchema = yup.object({
  trueOrFalseTestResultFormItems: yup.array().of(
    yup.object().shape({
      resultContent: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(30, '최대 30글자 이하로 입력해 주세요'),
      explanationContent: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(500, '최대 500글자 이하로 입력해 주세요'),
    }),
  ),
});
