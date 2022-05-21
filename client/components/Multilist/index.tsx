import Wrapper from './styles';
const Multilist = ({ handleMultilist, cardId }) => {
  return (
    <Wrapper>
      <ul>
        <li
          role="modify"
          onClick={(event) => handleMultilist(event, cardId, '수정')}
        >
          수정
        </li>
        <li
          role="delete"
          onClick={(event) => handleMultilist(event, cardId, '삭제')}
        >
          삭제
        </li>
      </ul>
    </Wrapper>
  );
};

export default Multilist;
