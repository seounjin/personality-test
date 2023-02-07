import React from 'react';
import TextFiled from '../TextFiled/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { Bottom, Form, Link, LoginFormButton } from './LoginModalForm.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginFormSchema = yup.object({
  email: yup.string().required('한 글자 이상 채워 주세요'),
  password: yup.string().required('한 글자 이상 채워 주세요'),
});

const LoginModalForm = () => {
  const handleSubmit = () => {
    console.log('제출');
  };

  const loginModalFormMethods = useForm({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
  });

  return (
    <FormProvider {...loginModalFormMethods}>
      <Form id="loginModalForm" onSubmit={handleSubmit}>
        <TextFiled label={'이메일'} name={'email'} />
        <TextFiled label={'비밀번호'} name={'password'} />
      </Form>

      <LoginFormButton>로그인</LoginFormButton>

      <Bottom>
        <Link>아이디 찾기</Link>
        <Link>비밀번호 찾기</Link>
        <Link>회원 가입</Link>
      </Bottom>
    </FormProvider>
  );
};

export default LoginModalForm;
