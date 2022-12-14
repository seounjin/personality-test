import React, { useCallback, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  addTypeItems,
  removeTypeItems,
  setTypeItems,
} from '../../../../store/modules/admin';
import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import TypeForm from '../../components/TypeForm/TypeForm';
import { Container, SetCounterButtonWrapper } from './TypeFormSection.style';

const TypeFormSection = () => {
  const [count, setCount] = useState<number>(MIN_TYPE_ITEMS_COUNT);
  const dispatch = useDispatch();
  const { typeItems } = useSelector(
    (state: RootState) => ({
      typeItems: state.admin.typeItems,
    }),
    shallowEqual,
  );

  const handleDecrease = () => {
    if (MIN_TYPE_ITEMS_COUNT === count) return;

    dispatch(removeTypeItems());

    setCount((count) => count - 1);
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === count) return;
    dispatch(addTypeItems());

    setCount((count) => count + 1);
  };

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ): void => {
      const {
        value,
        name,
        dataset: { index },
      } = event.target;

      dispatch(setTypeItems({ name, value, index }));
    },
    [],
  );

  return (
    <Container>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'유형 수 설정'}
          count={count}
          onLeftButtonClick={handleDecrease}
          onRightButtonClick={handleIncrease}
          minCount={MIN_TYPE_ITEMS_COUNT}
          maxCount={MAX_TYPE_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>
      {typeItems.map((props, index) => (
        <TypeForm
          key={`t${index}`}
          index={index}
          {...props}
          onChange={handleChange}
        />
      ))}
    </Container>
  );
};

export default TypeFormSection;
