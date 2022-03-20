import React from 'react';
import Wrapper from './styles';

interface Item {
  label: string;
  input: string;
}

interface UserFormProps {
  item: Item[];
  userId?: string;
  password?: string;
  handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm = ({
  handleUser,
  item,
  userId,
  password,
}: UserFormProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="user_container">
        {item.map((data, index) => {
          return (
            <div className="user_wrapper" key={`${data.label}` + index}>
              <label htmlFor={data.input}>{data.label}</label>
              <input
                id={data.input}
                name={data.input}
                onChange={handleUser}
                defaultValue={data.input == 'id' ? userId : password}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default React.memo(UserForm);
