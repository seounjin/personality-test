import Wrapper from './styles';
import { useState, useCallback } from 'react';
import UserForm from '../UserForm';
import AdminButton from '../AdminButton';

const ITEM = [
  { label: '아이디', input: 'id' },
  { label: '비밀번호', input: 'password' },
];

const ModalContainer = ({ handleModal }) => {
  const handleUser = useCallback((event) => {
    console.log('!!');
  }, []);

  const handleOk = useCallback(() => {
    console.log('!!');
  }, []);

  return (
    <Wrapper>
      <div className="overlay" onClick={handleModal}></div>
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
