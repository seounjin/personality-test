import React, { useCallback } from 'react';
import Wrapper from './UserForm.style';
import InputForm from '../InputForm/InputForm';
import { handleUser } from '../../store/modules/admin';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

const MInputForm = React.memo(InputForm);

const UserForm = (): JSX.Element => {
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
      {userItem.map(({ label, type, defaultValue }, index) => (
        <MInputForm
          key={label + index}
          label={label}
          type={type}
          defaultValue={defaultValue}
          index={index}
          onChange={onChange}
        />
      ))}
    </Wrapper>
  );
};

export default UserForm;
