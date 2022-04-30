import React from 'react';
import Wrapper from './styles';
import { UserItem } from '../SelectContainer/type';
import InputForm from '../InputForm';
import { reduxHandleUser } from '../../store/modules/admin';
import { useSelector, useDispatch } from 'react-redux';

// interface UserContainerProps {
//   userItem?: UserItem;
//   handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

const UserContainer = ({
  userItem = { title: '', id: '', password: '' },
}): JSX.Element => {
  const { title, id, password } = userItem;
  const dispatch = useDispatch();
  const ITEM = [
    { label: '제목', input: 'title', defaultValue: title },
    { label: '아이디', input: 'id', defaultValue: id },
    { label: '비밀번호', input: 'password', defaultValue: password },
  ];

  const onChange = (event) => {
    const { value, name } = event.target;

    dispatch(reduxHandleUser({ value, name }));
  };

  return (
    <Wrapper>
      <div className="user_container">
        <InputForm item={ITEM} handleChange={onChange}></InputForm>
      </div>
    </Wrapper>
  );
};

export default React.memo(UserContainer);
