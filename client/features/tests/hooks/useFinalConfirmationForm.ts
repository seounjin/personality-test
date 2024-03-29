import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetcher } from '../../../hooks/useFetcher';

const useFinalConfirmationForm = () => {
  const router = useRouter();
  const fetcher = useFetcher();

  const [isTemporaryTestOpen, setIsTemporaryTestOpen] = useState(false);

  const handleCloseTemporaryTest = () => {
    setIsTemporaryTestOpen(!isTemporaryTestOpen);
  };

  const requestRegister = async (formData, testType) => {
    const res = await fetcher('post', `/personality/${testType}`, formData);
    if (res.success) {
      alert('성향 테스트가 등록 되었습니다');
      router.push('/');
    } else {
      if (res.status === 400 || res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=tests');
        return;
      }
      alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    }
  };

  const requestUpdate = async (formData, testType) => {
    const id = router.query.slug[0];
    const res = await fetcher(
      'put',
      `/personality/${testType}/${id}`,
      formData,
    );
    if (res.success) {
      alert('해당 테스트가 업데이트 되었습니다');
      router.push('/mypage');
    } else {
      if (res.status === 400 || res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=tests');
        return;
      }
      alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    }
  };

  return {
    requestRegister,
    requestUpdate,
    handleCloseTemporaryTest,
    isTemporaryTestOpen,
  };
};

export default useFinalConfirmationForm;
