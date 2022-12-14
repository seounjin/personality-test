import React from 'react';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';

interface SetSelectFormSectionProps {
  numberOfItems: number;
  decreaseNumberOfItems: () => void;
  inCreaseNumberofItems: () => void;
}

const SetSelectFormSection = ({
  numberOfItems,
  decreaseNumberOfItems,
  inCreaseNumberofItems,
}: SetSelectFormSectionProps): JSX.Element => {
  return (
    <SetCounterButton
      label={'문항수 설정'}
      count={numberOfItems}
      onLeftButtonClick={decreaseNumberOfItems}
      onRightButtonClick={inCreaseNumberofItems}
      minCount={MIN_NUMBER_OF_ITEMS_COUNT}
      maxCount={MAX_NUMBER_OF_ITEMS_COUNT}
    />
  );
};

export default SetSelectFormSection;
