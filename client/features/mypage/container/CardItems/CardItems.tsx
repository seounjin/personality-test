import React, { useEffect, useState } from 'react';
import fetcher from '../../../../api/fetcher';
import CardList from '../../../home/components/CardList/CardList';
import { Card } from '../../../home/components/CardList/CardList.type';

const CardItems = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const getCards = async () => {
    const res = await fetcher('get', '/personality');
    console.log('res', res);
    setCards([...cards, ...res.data]);
  };

  useEffect(() => {
    getCards();
  }, []);

  return <>{cards.length ? <CardList cardItems={cards} /> : null}</>;
};

export default CardItems;
