import React from 'react';
import { Form } from './BasicInformationForm.style';
import TextFiled from '../../../../components/TextFiled/TextField';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setBasicInformationForm } from '../../../../store/modules/admin';

interface BasicInformationFormProps {
  handleNext: () => void;
}

const BasicInformationForm = ({
  handleNext,
}: BasicInformationFormProps): JSX.Element => {
  const { handleSubmit, trigger } = useFormContext();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { title, explain } = data;
    dispatch(setBasicInformationForm({ title: title, explain: explain }));
    handleNext();
  };

  return (
    <Form id="basicInformationForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiled label={'제 목'} name={'title'} />
      <TextFiled label={'설 명'} name={'explain'} />
    </Form>
  );
};

export default BasicInformationForm;
