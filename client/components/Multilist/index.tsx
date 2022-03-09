const Multilist = ({ handleModal }) => {
  return (
    <div>
      <ul>
        <li role="modify" onClick={handleModal}>
          수정
        </li>
        <li role="delete" onClick={handleModal}>
          삭제
        </li>
      </ul>
    </div>
  );
};

export default Multilist;
