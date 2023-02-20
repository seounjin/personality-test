import React, { ReactNode } from 'react';
import { Fieldset } from './RadioGroup.style';

interface RadioGroupProps {
  children: ReactNode;
}

const RadioGroup = ({ children }: RadioGroupProps): JSX.Element => {
  return <Fieldset>{children}</Fieldset>;
};

export default RadioGroup;
