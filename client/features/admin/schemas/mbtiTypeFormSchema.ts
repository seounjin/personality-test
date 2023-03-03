import yup from '../admin.yup';

export const mbtiTypeFormSchema = yup.object({
  mbtiTypeFormItems: yup.array().of(
    yup.object().shape({
      typeContent: yup.string(),
      explanationContent: yup
        .string()
        .required('한 글자 이상 채워 주세요')
        .max(100, '최대 100글자 이하로 입력해 주세요'),
    }),
  ),
});
