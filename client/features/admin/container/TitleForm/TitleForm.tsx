import React from 'react';
import { Wrapper } from './TitleForm.style';
import TextFiled from '../../components/TextFiled/TextField';

const TitleForm = (): JSX.Element => {
  return (
    <Wrapper>
      <TextFiled label={'제 목'} name={'title'} />
      <TextFiled label={'설 명'} name={'explain'} />
    </Wrapper>
  );
};

export default TitleForm;
