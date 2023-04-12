import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { useFetcher } from '../../../../hooks/useFetcher';
import PhraseText from '../../components/PhraseText/PhraseText';
import SignoutForm from '../../components/SignoutForm/SignoutForm';

const signoutFormSchema = yup.object({
  password: yup.string().required('비밀번호를 입력해주세요'),
});

const SignoutContainer = () => {
  const [userId, setUserId] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const fetcher = useFetcher();

  const SingoutFormMethods = useForm({
    resolver: yupResolver(signoutFormSchema),
    defaultValues: { password: '' },
    mode: 'onChange',
  });

  const requestUserId = async () => {
    const res = await fetcher('get', '/user');
    if (res.success) {
      setUserId(res.userId);
      return;
    }
    setIsError(true);
    alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
  };

  useEffect(() => {
    if (!userId) {
      requestUserId();
    }
  }, []);

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
    <>
      {userId && (
        <FormProvider {...SingoutFormMethods}>
          <SignoutForm email={userId} onSubmit={onSubmit} />
        </FormProvider>
      )}
      {isError && (
        <PhraseText text={'서버 점검중입니다.\n잠시 후 다시 시도해주세요'} />
      )}
    </>
  );
};

export default SignoutContainer;
