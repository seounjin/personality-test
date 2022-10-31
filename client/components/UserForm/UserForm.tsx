import React, { useCallback } from 'react';
import Wrapper from './UserForm.style';
import InputForm from '../InputForm/InputForm';
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

  const dispatch = useDispatch();

  const onChange = useCallback((event) => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;

    dispatch(handleUser({ value, name, index }));
  }, []);

  return (
    <Wrapper>
      {userItem.map((data, index) => {
        const { label, type, defaultValue } = data;
        return (
          <InputForm
            key={label + index}
            label={label}
            type={type}
            defaultValue={defaultValue}
            index={index}
            onChange={onChange}
          ></InputForm>
        );
      })}
    </Wrapper>
  );
};

export default UserContainer;
