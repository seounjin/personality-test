import React, { useCallback } from 'react';
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
      <div className="user_container">
        {userItem.map((data, index) => {
          const { label, input, defaultValue } = data;
          return (
            <InputForm
              key={label + index}
              label={label}
              input={input}
              defaultValue={defaultValue}
              num={index}
              handleChange={onChange}
            ></InputForm>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default UserContainer;
