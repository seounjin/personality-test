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
import fetcher from '../../api/fetcher';
import { useRouter } from 'next/router';

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
    const res = await fetcher('post', '/user/login', { data });
    if (res.success) {
      alert('로그인 성공');
      const redirect = router.query.redirect;
      if (redirect) {
        router.replace(`/${redirect}`);
      } else {
        router.replace('/');
      }
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다');
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
        <Link href="/">홈으로</Link>
        <Link href="/signup">회원 가입</Link>
      </Bottom>
    </Container>
  );
};

export default LoginModal;
