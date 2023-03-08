import * as yup from 'yup';

export const titleFormSchema = yup.object({
  title: yup
    .string()
    .required('한 글자 이상 채워 주세요')
    .max(20, '최대 20글자 이하로 입력해 주세요'),
  subTitle: yup
    .string()
    .required('한 글자 이상 채워 주세요')
    .max(20, '최대 20글자 이하로 입력해 주세요'),
  explain: yup
    .string()
    .required('한 글자 이상 채워 주세요')
    .max(100, '최대 100글자 이하로 입력해 주세요'),
});
