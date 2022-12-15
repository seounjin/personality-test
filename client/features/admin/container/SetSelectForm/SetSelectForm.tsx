import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  setNumberOfItemsCount,
  setOptionCount,
} from '../../../../store/modules/admin';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import { Container, SetCounterButtonWrapper } from './SetSelectForm.style';

// interface SetSelectFormSectionProps {
//   numberOfItems: number;
//   decreaseNumberOfItems: () => void;
//   inCreaseNumberofItems: () => void;
// }

const SetSelectForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const { optionItemsCount, numberOfItemsCount } = useSelector(
    (state: RootState) => ({
      optionItemsCount: state.admin.optionItemsCount,
      numberOfItemsCount: state.admin.numberOfItemsCount,
    }),
    shallowEqual,
  );

  const decreaseNumberOfItems = () => {
    dispatch(setNumberOfItemsCount({ count: -1 }));
  };

  const inCreaseNumberofItems = () => {
    dispatch(setNumberOfItemsCount({ count: 1 }));
  };

  const decreaeOptionItemsCount = () => {
    if (MIN_OPTION_ITEMS_COUNT === optionItemsCount) return;
    dispatch(setOptionCount({ count: -1 }));
  };

  const increaseOptionItemsCount = () => {
    if (MAX_OPTION_ITEMS_COUNT === optionItemsCount) return;
    dispatch(setOptionCount({ count: 1 }));
  };

  return (
    <Container>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'문항수 설정'}
          count={numberOfItemsCount}
          onLeftButtonClick={decreaseNumberOfItems}
          onRightButtonClick={inCreaseNumberofItems}
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
    </Container>
  );
};

export default SetSelectForm;
