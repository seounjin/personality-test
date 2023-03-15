import { useRouter } from 'next/router';
import fetcher from '../../../api/fetcher';

const useFinalConfirmationForm = () => {
  const router = useRouter();

  const getTestType = () => router.query.test;

  const requestRegister = async (data) => {
    const testType = getTestType();
    const res = await fetcher('post', `/personality/${testType}`, { data });
    if (res.success) {
      alert('성향 테스트가 등록 되었습니다');
      router.push('/');
    } else {
      if (res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=tests');
      } else {
        alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
      }
    }
  };

  const requestUpdate = async (data) => {
    const id = router.query.slug[0];
    const testType = getTestType();
    const res = await fetcher('put', `/personality/${testType}/${id}`, {
      data,
    });
    if (res.success) {
      alert('해당 테스트가 업데이트 되었습니다');
      router.push('/mypage');
    } else {
      if (res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=mypage');
      } else {
        alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
      }
    }
  };

  return { requestRegister, requestUpdate };
};

export default useFinalConfirmationForm;
