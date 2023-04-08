import { useRouter } from 'next/router';
import React, { useState } from 'react';
import fetcher from '../../../../api/fetcher';
import Modal from '../../../../components/Modal/Modal';
import CardList from '../../../../components/CardList/CardList';
import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';
import PhraseText from '../../components/PhraseText/PhraseText';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { useDispatch } from 'react-redux';
import { setCards } from '../../../../store/modules/mypage';
import MypageCardList from '../../components/MypageCardList/MypageCardList';

const CardItems = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [personalityId, setPersonalityId] = useState<string>('');
  const [testType, setTestType] = useState<string>('');
  const { cards } = useSelector(
    (state: RootState) => ({
      cards: state.mypage.cards,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const requestDelete = async () => {
    const res = await fetcher(
      'delete',
      `/personality/${testType}/${personalityId}`,
    );
    if (res.success) {
      alert('해당 테스트가 삭제되었습니다');
      const newCards = cards.filter((data) => data.id !== personalityId);
      dispatch(setCards(newCards));
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

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {cards.length ? (
        <MypageCardList
          cardItems={cards}
          handleLeftButton={deleteButtonClick}
          handleRightButton={updateButtonClick}
        />
      ) : (
        <PhraseText text={'아직 생성한 테스트가 없습니다'} />
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
