import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Bottom,
  Container,
  LoginFormButton,
  StyledLink,
  Title,
  TitleWrapper,
} from './LoginModal.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginModalForm from '../LoginModalForm/LoginModalForm';
import { useRouter } from 'next/router';
import { getLoginErrorMessage } from '../../errors';
import authFetcher from '../../api/authFetcher';

const loginFormSchema = yup.object({
  email: yup
    .string()
    .required('이메일을 입력해 주세요')
    .email('이메일 형식이 아닙니다.'),
  password: yup.string().required('비밀번호를 입력해주세요'),
});

const LoginModal = (): JSX.Element => {
  const router = useRouter();
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await authFetcher('post', '/user/login', { data });
    if (res.success) {
      alert('로그인 성공');
      const redirect = router.query.redirect;
      if (redirect) {
        router.replace(`/${redirect}`);
      } else {
        router.replace('/');
      }
    } else {
      const message = getLoginErrorMessage(res.status);
      alert(message);
    }
  };

  const loginModalFormMethods = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
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
        <StyledLink href="/">홈으로</StyledLink>
        <StyledLink href="/signup">회원 가입</StyledLink>
      </Bottom>
    </Container>
  );
};

export default LoginModal;
