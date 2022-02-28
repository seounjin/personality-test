import React from 'react';
import Wrapper from './styles';

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
        <div className="user_wrapper">
          <label>아이디</label>
          <input name="id" onChange={handleUser} />
        </div>
        <div className="user_wrapper">
          <label>비밀번호</label>
          <input name="password" onChange={handleUser} />
        </div>
      </div>
    </Wrapper>
  );
};

// export default UserContainer;
export default React.memo(UserContainer);
