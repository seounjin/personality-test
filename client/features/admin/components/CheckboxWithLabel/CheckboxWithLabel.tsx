import React from 'react';
import { useController, useWatch } from 'react-hook-form';
import HelperText from '../HelperText/HelperText';
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
  name: string;
}

const CheckboxWithLabel = ({
  items,
  name,
}: CheckboxWithLabelProps): JSX.Element => {
  const {
    field: { onChange, ...rest },
    fieldState,
  } = useController({ name });

  const checkboxItems = useWatch({ name }) || [];

  const handleChange = (event, value) => {
    const isChecked = event.target.checked;
    const newArray = isChecked
      ? [...checkboxItems, value]
      : checkboxItems.filter((data) => data !== value);

    onChange(newArray);
  };

  return (
    <Wrapper>
      {items.map(({ typeContent }, index) => (
        <Container key={`t${index}`}>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              value={typeContent}
              {...rest}
              onChange={(event) => handleChange(event, typeContent)}
            />
          </CheckboxWrapper>
          <LabelWrapper>
            <Label>{typeContent}</Label>
          </LabelWrapper>
        </Container>
      ))}
      {fieldState.error && (
        <HelperText text={fieldState.error.message}></HelperText>
      )}
    </Wrapper>
  );
};

export default CheckboxWithLabel;
