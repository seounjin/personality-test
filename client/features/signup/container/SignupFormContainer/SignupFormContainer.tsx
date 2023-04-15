import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormButton } from '../../../../components/LoginModal/LoginModal.style';
import SignupForm from '../../components/SignupForm/SignupForm';
import { signupFormSchema } from '../../Schema/SignupFormSchema';
import { useRouter } from 'next/router';

import {
  Container,
  SignupFormWrapper,
  TitleWrapper,
  Title,
  LoginLinkWrapper,
  Text,
} from './SignupFormContainer.style';
import { useFetcher } from '../../../../hooks/useFetcher';

const SignupFormContainer = () => {
  const signupFormMethods = useForm({
    resolver: yupResolver(signupFormSchema),
    defaultValues: { email: '', password: '', passwordConfirm: '' },
    mode: 'onChange',
  });

  const router = useRouter();
  const fetcher = useFetcher();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const data = { email, password };
    const res = await fetcher('post', `/users/signup`, { data });
    if (res.success) {
      router.push('/');
      alert('회원가입이 되었습니다');
    } else {
      alert(
        res.status === 409
          ? '이미 존재하는 이메일입니다'
          : '서버 점검 중입니다',
      );
    }
  };

  return (
    <Container>
      <SignupFormWrapper>
        <TitleWrapper>
          <Title>회원가입</Title>
        </TitleWrapper>
        <FormProvider {...signupFormMethods}>
          <SignupForm onSubmit={onSubmit} />
        </FormProvider>

        <LoginFormButton form="signupForm">회원가입</LoginFormButton>

        <LoginLinkWrapper>
          <Text>이미 가입 하셨나요?&nbsp;&nbsp;</Text>
          <Link href="/login">로그인</Link>
        </LoginLinkWrapper>
      </SignupFormWrapper>
    </Container>
  );
};

export default SignupFormContainer;
