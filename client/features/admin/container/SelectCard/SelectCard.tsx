import React, { useCallback } from 'react';
import { Wrapper } from './SelectCard.style';
import WriteForm from '../WriteForm/WriteForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  handlerSelectInput,
  setTypeItemsCount,
} from '../../../../store/modules/admin';

const MWriteForm = React.memo(WriteForm);

const SelectCard = (): JSX.Element => {
  const dispatch = useDispatch();

  const { selectItems, typeItems } = useSelector(
    (state: RootState) => ({
      selectItems: state.admin.selectItems,
      typeItems: state.admin.typeItems,
    }),
    shallowEqual,
  );

  const handlechange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        value,
        name,
        dataset: { index, optionIndex },
      } = event.target;

      dispatch(handlerSelectInput({ name, value, index, optionIndex }));
    },
    [],
  );

  const handleCheckbox = (event) => {
    const checked = event.target.checked;
    const key = event.target.value;
    dispatch(setTypeItemsCount({ count: checked ? 1 : -1, key: key }));
  };

  return (
    <Wrapper>
      {selectItems.map((data, index) => (
        <MWriteForm
          key={`s${index}`}
          item={data}
          selectIndex={index}
          typeItems={typeItems}
          onChange={handlechange}
          handleCheckbox={handleCheckbox}
        />
      ))}
    </Wrapper>
  );
};

export default SelectCard;
