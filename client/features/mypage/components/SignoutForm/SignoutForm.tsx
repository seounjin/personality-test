import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextFiled from '../../../../components/TextFiled/TextField';
import SubHeadlineLabel from '../../../../components/SubHeadlineLabel/SubHeadlineLabel';
import TextBox from '../../../../components/TextBox/TextBox';
import SubTextBoxSection from '../../../../components/SubTextBoxSection/SubTextBoxSection';
import { Form, Input } from './SignoutForm.style';

interface SignoutFormProps {
  email: string;
  onSubmit: (data: { password: string }) => void;
}

const SignoutForm = ({ email, onSubmit }: SignoutFormProps): JSX.Element => {
  const { handleSubmit } = useFormContext();

  return (
    <Form id="signoutForm" onSubmit={handleSubmit(onSubmit)}>
      <SubTextBoxSection>
        <SubHeadlineLabel label="이메일" subTitleLocation="start" />
        <TextBox text={email} />
      </SubTextBoxSection>
      <Input
        hidden
        type="text"
        autoComplete="username"
        value="{{...}}"
        readOnly
      />
      <TextFiled type="password" label={'비밀번호'} name={'password'} />
    </Form>
  );
};

export default SignoutForm;
