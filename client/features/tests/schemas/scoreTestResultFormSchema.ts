import yup from '../tests.yup';

export const scoreTestResultFormSchema = yup.object({
  scoreTestResultFormItems: yup
    .array()
    .of(
      yup.object().shape({
        resultContent: yup
          .string()
          .trim()
          .required('한 글자 이상 채워 주세요')
          .max(30, '최대 30글자 이하로 입력해 주세요'),
        explanationContent: yup
          .string()
          .required('한 글자 이상 채워 주세요')
          .max(500, '최대 500글자 이하로 입력해 주세요'),
      }),
    )
    .test('checkTypeContent', '유형을 작성해 주세요', (items) => {
      return items.every(({ resultContent }) => resultContent.length !== 0);
    })
    .unique((a) => a.resultContent, '중복된 유형이 있습니다'),
});
