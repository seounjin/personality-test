import * as yup from 'yup';

export const signupFormSchema = yup.object({
  email: yup.string().required('한 글자 이상 채워 주세요'),
  password: yup.string().required('한 글자 이상 채워 주세요'),
});
