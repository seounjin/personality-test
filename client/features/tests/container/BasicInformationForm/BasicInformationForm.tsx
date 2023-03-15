import React from 'react';
import { Form, TextFiledArea } from './BasicInformationForm.style';
import TextFiled from '../../../../components/TextFiled/TextField';
import { useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setBasicInformationForm } from '../../../../store/modules/tests';
import useStorage from '../../hooks/useStorage';
import { RootState } from '../../../../store/modules';
import ThumbnailImageUpload from '../ThumbnailImageUpload/ThumbnailImageUpload';

interface BasicInformationFormProps {
  handleNext: () => void;
}

const BasicInformationForm = ({
  handleNext,
}: BasicInformationFormProps): JSX.Element => {
  const { handleSubmit, trigger } = useFormContext();
  const dispatch = useDispatch();
  const { setTestItems } = useStorage();
  const { mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
    }),
    shallowEqual,
  );
  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { title, subTitle, explain } = data;

    if (mode === 'create') {
      setTestItems({ basicInformationItems: data });
    }

    dispatch(
      setBasicInformationForm({
        title: title,
        subTitle: subTitle,
        explain: explain,
      }),
    );
    handleNext();
  };

  return (
    <Form id="basicInformationForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiledArea>
        <TextFiled label={'제 목'} name={'title'} />
        <TextFiled label={'부제목'} name={'subTitle'} />
        <TextFiled label={'설 명'} name={'explain'} />
      </TextFiledArea>
      <ThumbnailImageUpload />
    </Form>
  );
};

export default BasicInformationForm;
