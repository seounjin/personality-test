import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import fetcher from '../../../../api/fetcher';
import CardList from '../../../home/components/CardList/CardList';
import { Card } from '../../../home/components/CardList/CardList.type';
import PhraseText from '../../components/PhraseText/PhraseText';

const CardItems = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const router = useRouter();

  const getCards = async () => {
    const res = await fetcher('get', '/personality/my-personality');
    setCards([...cards, ...res.data]);
  };

  const deleteButtonClick = async (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    const res = await fetcher('delete', `/personality/${id}`);
    if (res.success) {
      alert('해당 테스트가 삭제되었습니다');
      setCards(cards.filter((data) => data.id !== id));
    } else {
      if (res.status === 401) {
        alert('로그인 유효시간이 만료 되었습니다 \n다시 로그인해 주세요');
        router.push('/login?redirect=mypage');
      } else {
        alert('서버 점검중입니다.');
      }
    }
  };

  const modifyButtonClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    console.log('수정');
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {cards.length ? (
        <CardList
          cardItems={cards}
          handleLeftButton={deleteButtonClick}
          handleRightButton={modifyButtonClick}
          type="mypage"
        />
      ) : (
        <PhraseText text={'아직 생성한 테스트가 없습니다'} />
      )}
    </>
  );
};

export default CardItems;
