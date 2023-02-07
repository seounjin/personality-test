import * as yup from 'yup';

export const signupFormSchema = yup.object({
  email: yup
    .string()
    .required('이메일을 입력해 주세요')
    .email('이메일 형식이 아닙니다.'),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
      '영문, 숫자, 특수문자를 조합해주세요',
    )
    .min(8, '8글자 이상 입력해주세요')
    .max(15, '15글자 이하로 입력해주세요')
    .required('비밀번호를 입력해주세요'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 다릅니다'),
});
