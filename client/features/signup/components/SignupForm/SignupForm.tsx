import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextFiled from '../../../../components/TextFiled/TextField';
import { Form } from './SignupForm.style';

interface SignupFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps): JSX.Element => {
  const { handleSubmit } = useFormContext();

  return (
    <Form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiled label={'이메일'} name={'email'} />
      <TextFiled type={'password'} label={'비밀번호'} name={'password'} />
      <TextFiled
        type={'password'}
        label={'비밀번호 확인'}
        name={'passwordConfirm'}
      />
    </Form>
  );
};

export default SignupForm;
