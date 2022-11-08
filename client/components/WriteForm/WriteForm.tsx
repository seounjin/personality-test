import InputForm from '../InputForm/InputForm';

interface Item {
  label: string;
  type: string;
  defaultValue: string;
}

interface WriteFormProps {
  item: Item[];
  selectIndex: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteForm = ({
  item,
  selectIndex,
  onChange,
}: WriteFormProps): JSX.Element => {
  return (
    <>
      {item.map((data, index) => {
        const { label, type, defaultValue } = data;
        return (
          <InputForm
            key={`i${index}`}
            label={label}
            type={type}
            index={selectIndex}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};

export default WriteForm;
