import React from 'react';
import Wrapper from './styles';
import { useState, useCallback } from 'react';
import UserForm from '../UserForm';
import AdminButton from '../AdminButton';
import fetcher from '../../api/fetcher';

const ITEM = [
  { label: '아이디', input: 'id' },
  { label: '비밀번호', input: 'password' },
];

interface ModalProps {
  handleModal: (cardId?: string) => void;
  SelectCard: string;
}

const ModalContainer = ({
  handleModal,
  SelectCard,
}: ModalProps): JSX.Element => {
  const [UserId, setUserId] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [User, setUser] = useState({ id: '', password: '' });

  const handleOk = async () => {
    console.log('!!!', UserId, Password, SelectCard);
    const res = await fetcher('post', `/test`, {
      userId: UserId,
      password: Password,
      cardId: SelectCard,
    });
    // if (res.success) {
    //   alert('성공');
    // }
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
      <div className="overlay" onClick={() => handleModal()}></div>
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
