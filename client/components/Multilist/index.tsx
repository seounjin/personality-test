const Multilist = ({ handleModal, cardId }) => {
  return (
    <div>
      <ul>
        <li role="modify" onClick={() => handleModal(cardId)}>
          수정
        </li>
        <li role="delete" onClick={() => handleModal(cardId)}>
          삭제
        </li>
      </ul>
    </div>
  );
};

export default Multilist;
