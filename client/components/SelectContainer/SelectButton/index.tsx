import React from 'react';
import Wrapper from './styles';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/modules';
import {
  transSelectItem,
  deleteSelectItem,
} from '../../../store/modules/admin';

interface SelectButtonProps {
  index: number;
}

const SelectButton = ({ index }: SelectButtonProps): JSX.Element => {
  const dispatch = useDispatch();

  const { item, isVisible } = useSelector(
    (state: RootState) => ({
      item: state.admin.items[index],
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const handleOk = (index: number): void => {
    const { question, select_1, select_2 } = item;
    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch(transSelectItem({ index }));
  };

  const handleDelete = (index: number): void => {
    dispatch(deleteSelectItem({ index }));
  };

  return (
    <Wrapper>
      <button onClick={() => handleOk(index)}>
        {isVisible[index] ? '확인' : '수정'}
      </button>
      <button onClick={() => handleDelete(index)}>삭제</button>
    </Wrapper>
  );
};

export default SelectButton;
