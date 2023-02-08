import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Bottom,
  Container,
  Link,
  LoginFormButton,
  Title,
  TitleWrapper,
} from './LoginModal.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginModalForm from '../LoginModalForm/LoginModalForm';

const loginFormSchema = yup.object({
  email: yup
    .string()
    .required('이메일을 입력해 주세요')
    .email('이메일 형식이 아닙니다.'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

const LoginModal = () => {
  const onSubmit = () => {
    console.log('제출');
  };

  const loginModalFormMethods = useForm({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
  });

  return (
    <Container>
      <TitleWrapper>
        <Title>로그인</Title>
      </TitleWrapper>
      <FormProvider {...loginModalFormMethods}>
        <LoginModalForm onSubmit={onSubmit} />
      </FormProvider>
      <LoginFormButton form="loginModalForm">로그인</LoginFormButton>

      <Bottom>
        <Link>아이디 찾기</Link>
        <Link>비밀번호 찾기</Link>
        <Link href="/signup">회원 가입</Link>
      </Bottom>
    </Container>
  );
};

export default LoginModal;
