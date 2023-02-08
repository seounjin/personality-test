import { useFormContext } from 'react-hook-form';
import TextFiled from '../TextFiled/TextField';
import { Form } from './LoginModalForm.style';

interface LoginModalFormProps {
  onSubmit: () => void;
}

const LoginModalForm = ({ onSubmit }: LoginModalFormProps): JSX.Element => {
  const { handleSubmit } = useFormContext();

  return (
    <Form id="loginModalForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiled label={'이메일'} name={'email'} />
      <TextFiled type="password" label={'비밀번호'} name={'password'} />
    </Form>
  );
};

export default LoginModalForm;
