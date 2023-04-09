import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, shallowEqual } from 'react-redux';
import * as yup from 'yup';
import { LoginFormButton } from '../../../../components/LoginModal/LoginModal.style';
import { useFetcher } from '../../../../hooks/useFetcher';
import { RootState } from '../../../../store/modules';
import SignoutForm from '../../components/SignoutForm/SignoutForm';
import { Container, Wrapper } from './SignoutContainer.style';

const signoutFormSchema = yup.object({
  password: yup.string().required('비밀번호를 입력해주세요'),
});

const SignoutContainer = () => {
  const router = useRouter();
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.mypage.user,
    }),
    shallowEqual,
  );
  const fetcher = useFetcher();

  const SingoutFormMethods = useForm({
    resolver: yupResolver(signoutFormSchema),
    defaultValues: { password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: { password: string }) => {
    const res = await fetcher('post', '/user/signout', { data });
    if (res.success) {
      alert('회원탈퇴가 정상적으로 이루어졌습니다.');
      router.replace('/');
    } else {
      if (res.status === 400) {
        alert('비밀번호가 일치하지 않습니다');
        return;
      }
      alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    }
  };

  return (
    <Wrapper>
      <Container>
        <FormProvider {...SingoutFormMethods}>
          <SignoutForm email={user} onSubmit={onSubmit} />
        </FormProvider>
        <LoginFormButton form="signoutForm">회원탈퇴</LoginFormButton>
      </Container>
    </Wrapper>
  );
};

export default SignoutContainer;
