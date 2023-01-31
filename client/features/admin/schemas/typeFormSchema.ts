import yup from '../admin.yup';

export const typeFormSchema = yup.object({
  typeFormItems: yup
    .array()
    .of(
      yup.object().shape({
        typeContent: yup
          .string()
          .trim()
          .required('한 글자 이상 채워 주세요')
          .max(10, '최대 10글자 이하로 입력해 주세요'),
        explanationContent: yup
          .string()
          .required('한 글자 이상 채워 주세요')
          .max(100, '최대 100글자 이하로 입력해 주세요'),
      }),
    )
    .test('checkTypeContent', '유형을 작성해 주세요', (items) => {
      return items.every(({ typeContent }) => typeContent.length !== 0);
    })
    .unique((a) => a.typeContent, '중복된 유형이 있습니다'),
});
