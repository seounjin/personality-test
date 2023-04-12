import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';
import PhraseText from '../../components/PhraseText/PhraseText';
import MypageCardList from '../../components/MypageCardList/MypageCardList';
import { useFetcher } from '../../../../hooks/useFetcher';

const CardItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [personalityId, setPersonalityId] = useState<string>('');
  const [testType, setTestType] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [cards, setCards] = useState([]);
  const router = useRouter();
  const fetcher = useFetcher();

  const requestCardList = async () => {
    const res = await fetcher('get', '/personality/my-personality');
    if (res.success) {
      setCards(res.data);
      setIsEmpty(!res.data.length);
    }
  };

  useEffect(() => {
    if (!cards.length) {
      requestCardList();
    }
  }, []);

  const requestDelete = async () => {
    const res = await fetcher(
      'delete',
      `/personality/${testType}/${personalityId}`,
    );
    if (res.success) {
      alert('해당 테스트가 삭제되었습니다');
      const newCards = cards.filter((data) => data.id !== personalityId);
      setCards(newCards);
      setIsEmpty(!newCards.length);
      setIsModalOpen(false);
    } else {
      if (res.status === 400 || res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=mypage');
        return;
      }
      alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    }
  };

  const deleteButtonClick = (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => {
    event.preventDefault();
    setIsModalOpen(true);
    setPersonalityId(id);
    setTestType(testType);
  };

  const updateButtonClick = async (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => {
    event.preventDefault();
    router.push(`/tests/${id}?test=${testType}`);
  };

  const getAccessToken = async (id: string): Promise<string> => {
    const res = await fetcher('get', `/propensity/${id}/access-token`);

    if (res.success) {
      return res.accessToken;
    }
    alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    return '';
  };

  const copyUrl = (shareUrl: string) => {
    const text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = shareUrl;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    alert('링크가 복사되었습니다.');
  };

  const getPublicShareUrl = (id, testType) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/main/${id}?test=${testType}`;
  };

  const getNotPublicShareUrl = async (id, testType) => {
    const acceeeToken = await getAccessToken(id);
    return `${process.env.NEXT_PUBLIC_BASE_URL}/main/${id}?test=${testType}&accessToken=${acceeeToken}`;
  };

  const shareButtonClick = async (
    event: React.MouseEvent,
    id: string,
    testType: string,
    isPublic: boolean,
  ) => {
    event.preventDefault();

    let shareUrl = '';
    if (isPublic) {
      shareUrl = getPublicShareUrl(id, testType);
    } else {
      shareUrl = await getNotPublicShareUrl(id, testType);
    }

    copyUrl(shareUrl);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isEmpty ? (
        <PhraseText text={'아직 생성한 테스트가 없습니다'} />
      ) : (
        <MypageCardList
          cardItems={cards}
          deleteButtonClick={deleteButtonClick}
          updateButtonClick={updateButtonClick}
          shareButtonClick={shareButtonClick}
        />
      )}
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <DeleteAlertModal
            handleConfirm={requestDelete}
            handleClose={handleClose}
          />
        </Modal>
      )}
    </>
  );
};

export default CardItems;
