import React from 'react';
import Wrapper from './styles';
import { useState, useCallback } from 'react';
import UserForm from '../UserForm';
import AdminButton from '../AdminButton';
import fetcher from '../../api/fetcher';
import { useRouter } from 'next/router';

const ITEM = [
  { label: '아이디', input: 'id' },
  { label: '비밀번호', input: 'password' },
];

interface ModalProps {
  handleModal: (
    event?: React.MouseEvent<HTMLElement>,
    cardId?: string,
    action?: string,
  ) => void;
  SelectCard: string;
  SelectAction: string;
}

const ModalContainer = ({
  handleModal,
  SelectCard,
  SelectAction,
}: ModalProps): JSX.Element => {
  const [UserId, setUserId] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleOk = async () => {
    console.log('SelectAction', SelectAction);
    if (SelectAction === '삭제') {
      const res = await fetcher('post', `/tests/${SelectCard}/delete`, {
        userId: UserId,
        password: Password,
      });

      if (res.success) {
        alert('해당 카드를 삭제하였습니다.');
        router.reload();
      } else {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }
    } else {
      // 수정
      const res = await fetcher('post', `/tests/${SelectCard}/edit-page`, {
        userId: UserId,
        password: Password,
      });

      // 아이디 비밀번호 일치할경우 수정페이지로 이동
      if (res.success) {
        router.push(`/admin/${SelectCard}`);
      } else {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleUser = useCallback((event): void => {
    event.preventDefault();

    const { value, name } = event.target;
    console.log('!!!', value);

    if (name === 'id') {
      setUserId(value);
    } else {
      setPassword(value);
    }
  }, []);

  return (
    <Wrapper>
      <div className="overlay" onClick={(event) => handleModal(event)}></div>
      <div className="modal">
        <UserForm handleUser={handleUser} item={ITEM}></UserForm>
        <AdminButton
          leftButton={handleOk}
          rightButton={handleModal}
          leftName={'확인'}
          rightName={'취소'}
        />
      </div>
    </Wrapper>
  );
};

export default ModalContainer;
