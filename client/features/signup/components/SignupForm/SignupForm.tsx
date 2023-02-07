import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TextFiled from '../../../../components/TextFiled/TextField';
import { signupFormSchema } from '../../Schema/SignupFormSchema';
import { Form } from './SignupForm.style';

interface SignupFormProps {
  onSubmit: () => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps): JSX.Element => {
  const signupFormMethods = useForm({
    resolver: yupResolver(signupFormSchema),
    mode: 'onChange',
  });

  return (
    <FormProvider {...signupFormMethods}>
      <Form id="signupForm" onSubmit={onSubmit}>
        <TextFiled label={'이메일'} name={'email'} />
        <TextFiled label={'비밀번호'} name={'password'} />
      </Form>
    </FormProvider>
  );
};

export default SignupForm;
