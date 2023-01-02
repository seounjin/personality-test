import React from 'react';
import { Form } from './TitleForm.style';
import TextFiled from '../../components/TextFiled/TextField';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setTitleFormItems } from '../../../../store/modules/admin';

interface TitleForm {
  handleNext: () => void;
}

const TitleForm = ({ handleNext }): JSX.Element => {
  const { handleSubmit, trigger } = useFormContext();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { title, explain } = data;
    dispatch(setTitleFormItems({ titlie: title, explain: explain }));
    handleNext();
  };

  return (
    <Form id="titleForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiled label={'제 목'} name={'title'} />
      <TextFiled label={'설 명'} name={'explain'} />
    </Form>
  );
};

export default TitleForm;
