import yup from '../tests.yup';

export const mbtiTestResultFormSchema = yup.object({
  mbtiTestResultFormItems: yup.array().of(
    yup.object().shape({
      resultContent: yup
        .string()
        .trim()
        .required('한 글자 이상 채워 주세요')
        .max(10, '최대 10글자 이하로 입력해 주세요'),
      explanationContent: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(100, '최대 100글자 이하로 입력해 주세요'),
    }),
  ),
});
