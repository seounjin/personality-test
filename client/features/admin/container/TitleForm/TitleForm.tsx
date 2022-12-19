import React from 'react';
import { Wrapper } from './TitleForm.style';

import { useFormContext } from 'react-hook-form';
import TextFiled from '../../components/TextFiled/TextField';

const TitleForm = (): JSX.Element => {
  const { register } = useFormContext();

  return (
    <Wrapper>
      <TextFiled
        label={'제 목'}
        errorText={'에러'}
        name={'title'}
        {...register('title')}
      />
      <TextFiled
        label={'설 명'}
        errorText={'에러'}
        name={'explain'}
        {...register('explain')}
      />
    </Wrapper>
  );
};

export default TitleForm;
