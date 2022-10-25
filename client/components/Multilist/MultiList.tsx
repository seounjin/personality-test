import { Wrapper, MultiListItem } from './MultiList.style';
const MultiList = () => {
  return (
    <Wrapper>
      <MultiListItem role="modify">수정</MultiListItem>
      <MultiListItem role="delete">삭제</MultiListItem>
    </Wrapper>
  );
};

export default MultiList;
