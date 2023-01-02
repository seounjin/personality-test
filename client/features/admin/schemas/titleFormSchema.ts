import * as yup from 'yup';

export const titleFormSchema = yup.object({
  title: yup.string().required('한 글자 이상 채워 주세요'),
  explain: yup.string().required('한 글자 이상 채워 주세요'),
});
