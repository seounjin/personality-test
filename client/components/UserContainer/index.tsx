import React from 'react';
import Wrapper from './styles';
import UserForm from '../UserForm';

const ITEM = [
  { label: '아이디', input: 'id' },
  { label: '비밀번호', input: 'password' },
];

interface UserContainerProps {
  handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserContainer = ({ handleUser }: UserContainerProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="user_container">
        <div className="user_wrapper">
          <label>제목</label>
          <input name="title" onChange={handleUser} />
        </div>
        <UserForm item={ITEM} handleUser={handleUser}></UserForm>
      </div>
    </Wrapper>
  );
};

export default React.memo(UserContainer);
