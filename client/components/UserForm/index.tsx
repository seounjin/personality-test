import Wrapper from './styles';

interface Item {
  label: string;
  input: string;
}

interface UserFormProps {
  item: Item[];
  handleUser: (event) => void;
}

const UserForm = ({ handleUser, item }: UserFormProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="user_container">
        {item.map((data, index) => {
          return (
            <div className="user_wrapper" key={`${data.label}` + index}>
              <label htmlFor={data.input}>{data.label}</label>
              <input id={data.input} name={data.input} onChange={handleUser} />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default UserForm;
