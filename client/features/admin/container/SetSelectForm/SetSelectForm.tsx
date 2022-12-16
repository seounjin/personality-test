import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  addNumberOfItems,
  removeNumberOfItems,
  addOptionItems,
  removeOptionItems,
} from '../../../../store/modules/admin';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import WeightedBoard from '../../components/WeightedBoard/WeightedBoard';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';
import SelectCard from '../SelectCard/SelectCard';
import { Container, SetCounterButtonWrapper } from './SetSelectForm.style';

const SetSelectForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const [numberOfItemsCount, setNumberOfItemsCount] = useState(
    MIN_NUMBER_OF_ITEMS_COUNT,
  );
  const [optionItemsCount, setOptionItemsCount] = useState(
    MIN_OPTION_ITEMS_COUNT,
  );

  const { typeList, typeDictionary } = useSelector(
    (state: RootState) => ({
      typeList: state.admin.typeList,
      typeDictionary: state.admin.typeDictionary,
    }),
    shallowEqual,
  );

  const decreaseNumberOfItems = () => {
    if (MIN_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    dispatch(removeNumberOfItems());
    setNumberOfItemsCount((numberOfItemsCount) => numberOfItemsCount - 1);
  };

  const inCreaseNumberOfItems = () => {
    if (MAX_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    dispatch(addNumberOfItems({ numberOfItemsCount: numberOfItemsCount + 1 }));
    setNumberOfItemsCount((numberOfItemsCount) => numberOfItemsCount + 1);
  };

  const decreaeOptionItemsCount = () => {
    if (MIN_OPTION_ITEMS_COUNT === optionItemsCount) return;
    dispatch(removeOptionItems());
    setOptionItemsCount((optionItemsCount) => optionItemsCount - 1);
  };

  const increaseOptionItemsCount = () => {
    if (MAX_OPTION_ITEMS_COUNT === optionItemsCount) return;
    dispatch(addOptionItems({ optionItemsCount: optionItemsCount + 1 }));
    setOptionItemsCount((optionItemsCount) => optionItemsCount + 1);
  };

  return (
    <Container>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'문항수 설정'}
          count={numberOfItemsCount}
          onLeftButtonClick={decreaseNumberOfItems}
          onRightButtonClick={inCreaseNumberOfItems}
          minCount={MIN_NUMBER_OF_ITEMS_COUNT}
          maxCount={MAX_NUMBER_OF_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>

      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'선택지 수 설정'}
          count={optionItemsCount}
          onLeftButtonClick={decreaeOptionItemsCount}
          onRightButtonClick={increaseOptionItemsCount}
          minCount={MIN_OPTION_ITEMS_COUNT}
          maxCount={MAX_OPTION_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>
      <SelectCard />

      <BoxShadowCard subtitle={'가중치'}>
        <WeightedBoard items={typeList} dictionary={typeDictionary} />
      </BoxShadowCard>
    </Container>
  );
};

export default SetSelectForm;
