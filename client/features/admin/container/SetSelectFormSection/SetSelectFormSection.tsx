import React from 'react';
import {
  MIN_NUMBER_OF_ITEMS_VALUE,
  MAX_NUMBER_OF_ITEMS_Value,
} from '../../admin.const';
import SetSlectForm from '../../components/SetSlectForm/SetSlectForm';

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
    <SetSlectForm
      label={'문항수 설정'}
      value={numberOfItems}
      onLeftButtonClick={decreaseNumberOfItems}
      onRightButtonClick={inCreaseNumberofItems}
      minValue={MIN_NUMBER_OF_ITEMS_VALUE}
      maxValue={MAX_NUMBER_OF_ITEMS_Value}
    />
  );
};

export default SetSelectFormSection;
