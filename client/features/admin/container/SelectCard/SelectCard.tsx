import React, { useCallback } from 'react';
import { Wrapper } from './SelectCard.style';
import WriteForm from '../../components/WriteForm/WriteForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { handlerSelectInput } from '../../../../store/modules/admin';

const MWriteForm = React.memo(WriteForm);

const SelectCard = (): JSX.Element => {
  const dispatch = useDispatch();

  const { selectItems } = useSelector(
    (state: RootState) => ({
      selectItems: state.admin.selectItems,
    }),
    shallowEqual,
  );

  const handlechange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        value,
        name,
        dataset: { index },
      } = event.target;
      dispatch(handlerSelectInput({ name, value, index }));
    },
    [],
  );

  return (
    <Wrapper>
      {selectItems.map((data, index) => {
        return (
          <MWriteForm
            key={`s${index}`}
            item={data}
            selectIndex={index}
            onChange={handlechange}
          />
        );
      })}
    </Wrapper>
  );
};

export default SelectCard;
