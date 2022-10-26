import { Wrapper, MultiListItem } from './MultiList.style';
import { useDispatch } from 'react-redux';
import {
  setIsOpenModal,
  setSelectAction,
  setSelectCard,
} from '../../store/modules/home';

interface MultiListProps {
  cardId: string;
}

const MultiList = ({ cardId }: MultiListProps): JSX.Element => {
  const dispatch = useDispatch();

  const onClick = (event, action) => {
    event.preventDefault();
    dispatch(setSelectCard(cardId));
    dispatch(setSelectAction(action));
    dispatch(setIsOpenModal(true));
  };

  return (
    <Wrapper>
      <MultiListItem
        role="modify"
        onClick={(event) => onClick(event, 'modify')}
      >
        수정
      </MultiListItem>
      <MultiListItem
        role="delete"
        onClick={(event) => onClick(event, 'delete')}
      >
        삭제
      </MultiListItem>
    </Wrapper>
  );
};

export default MultiList;
