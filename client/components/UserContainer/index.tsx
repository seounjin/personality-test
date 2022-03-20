import React from 'react';
import Wrapper from './styles';
import UserForm from '../UserForm';
import { UserItem } from '../SelectContainer/type';

const ITEM = [
  { label: '아이디', input: 'id' },
  { label: '비밀번호', input: 'password' },
];

interface UserContainerProps {
  userItem?: UserItem;
  handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserContainer = ({
  userItem = { title: '', id: '', password: '' },
  handleUser,
}: UserContainerProps): JSX.Element => {
  const { title, id, password } = userItem;

  return (
    <Wrapper>
      <div className="user_container">
        <div className="user_wrapper">
          <label>제목</label>
          <input
            name="title"
            defaultValue={title ? title : ''}
            onChange={handleUser}
          />
        </div>
        <UserForm
          item={ITEM}
          handleUser={handleUser}
          userId={id}
          password={password}
        ></UserForm>
      </div>
    </Wrapper>
  );
};

export default React.memo(UserContainer);
