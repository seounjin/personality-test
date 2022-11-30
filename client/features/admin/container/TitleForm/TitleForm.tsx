import React, { useCallback } from 'react';
import Container from './TitleForm.style';
import InputForm from '../../../../components/InputForm/InputForm';
import { handleTitle } from '../../../../store/modules/admin';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';

const MInputForm = React.memo(InputForm);

const TitleForm = (): JSX.Element => {
  const { titleItems } = useSelector(
    (state: RootState) => ({
      titleItems: state.admin.titleItems,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        value,
        name,
        dataset: { index },
      } = event.target;

      dispatch(handleTitle({ value, name, index }));
    },
    [],
  );

  return (
    <Container>
      {titleItems.map(({ label, type, defaultValue }, index) => (
        <MInputForm
          key={label + index}
          label={label}
          type={type}
          defaultValue={defaultValue}
          index={index}
          onChange={onChange}
        />
      ))}
    </Container>
  );
};

export default TitleForm;
