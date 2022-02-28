import React from 'react';
import Wrapper from './styles';

interface SelectButtonProps {
  handleOk: (index: number) => void;
  handleDelete: (index: number) => void;
  index: number;
  isVisible: boolean;
}

const SelectButton = ({
  handleOk,
  handleDelete,
  index,
  isVisible,
}: SelectButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <button onClick={() => handleOk(index)}>
        {isVisible ? '확인' : '수정'}
      </button>
      <button onClick={() => handleDelete(index)}>삭제</button>
    </Wrapper>
  );
};

export default React.memo(SelectButton);
