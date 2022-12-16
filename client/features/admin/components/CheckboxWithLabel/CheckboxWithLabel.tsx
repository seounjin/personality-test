import React from 'react';
import { TypeItems } from '../TypeForm/TypeForm.type';
import {
  Checkbox,
  Wrapper,
  Container,
  Label,
  LabelWrapper,
  CheckboxWrapper,
} from './CheckboxWithLabel.style';

interface CheckboxWithLabelProps {
  items: TypeItems[];
}

const CheckboxWithLabel = ({ items }: CheckboxWithLabelProps): JSX.Element => {
  return (
    <Wrapper>
      {items.map(({ typeContent }, index) => (
        <Container key={`t${index}`}>
          <CheckboxWrapper>
            <Checkbox type="checkbox" />
          </CheckboxWrapper>
          <LabelWrapper>
            <Label>{typeContent}</Label>
          </LabelWrapper>
        </Container>
      ))}
    </Wrapper>
  );
};

export default CheckboxWithLabel;
