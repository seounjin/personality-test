import React from 'react';
import { SButton } from './SubmitButton.style';

interface SubmitButtonProps {
  formId: string;
}

const SubmitButton = ({ formId }: SubmitButtonProps): JSX.Element => {
  return <SButton form={formId}>{'제 출'}</SButton>;
};

export default SubmitButton;
