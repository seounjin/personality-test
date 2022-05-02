import React from 'react';
import Wrapper from './styles';
import InputForm from '../InputForm';
import { handleUser } from '../../store/modules/admin';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

const UserContainer = (): JSX.Element => {
  const { userItem } = useSelector(
    (state: RootState) => ({
      userItem: state.admin.userItem,
    }),
    shallowEqual,
  );

  const { title, id, password } = userItem;
  const dispatch = useDispatch();
  const ITEM = [
    { label: '제목', input: 'title', defaultValue: title },
    { label: '아이디', input: 'id', defaultValue: id },
    { label: '비밀번호', input: 'password', defaultValue: password },
  ];

  const onChange = (event) => {
    const { value, name } = event.target;

    dispatch(handleUser({ value, name }));
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
