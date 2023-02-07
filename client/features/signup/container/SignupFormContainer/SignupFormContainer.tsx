import Link from 'next/link';
import React from 'react';
import { LoginFormButton } from '../../../../components/LoginModalForm/LoginModalForm.style';
import SignupForm from '../../components/SignupForm/SignupForm';

import {
  Container,
  SignupFormWrapper,
  TitleWrapper,
  Title,
  LoginLinkWrapper,
} from './SignupFormContainer.style';

const SignupFormContainer = () => {
  const handleSubmit = () => {
    console.log('회원가입 제출');
  };

  return (
    <Container>
      <SignupFormWrapper>
        <TitleWrapper>
          <Title>회원가입</Title>
        </TitleWrapper>
        <SignupForm onSubmit={handleSubmit} />
        <LoginFormButton>회원가입</LoginFormButton>
        <LoginLinkWrapper>
          <span>이미 가입 하셨나요?&nbsp;&nbsp;</span>
          <Link href="/login">로그인</Link>
        </LoginLinkWrapper>
      </SignupFormWrapper>
    </Container>
  );
};

export default SignupFormContainer;
