import React from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import HelperText from '../../components/HelperText/HelperText';
import { HelperTextWrapper } from '../../components/TextFiled/TextFiled.style';
import { FormData } from '../StepForm/StepForm.type';
import {
  Checkbox,
  Wrapper,
  Container,
  Label,
  LabelWrapper,
  CheckboxWrapper,
} from './CheckboxWithLabel.style';
import { WeightCheckboxes } from './CheckboxWithLabel.type';

interface CheckboxWithLabelProps {
  items: WeightCheckboxes[];
  name: string;
}

const CheckboxWithLabel = ({
  items,
  name,
}: CheckboxWithLabelProps): JSX.Element => {
  const { setValue, getValues } = useFormContext<FormData>();

  const {
    field: { onChange, ...rest },
    fieldState,
  } = useController({ name });

  const checkboxItems = useWatch({ name }) || [];

  const handleChange = (event, value) => {
    const isChecked = event.target.checked;
    const newArray = checkboxItems.map((data) => ({
      ...data,
      isChecked: data.value === value ? isChecked : data.isChecked,
    }));

    const typeDictionary = getValues('typesDictionary');

    setValue('typesDictionary', {
      ...typeDictionary,
      [value]: isChecked
        ? typeDictionary[value] + 1
        : typeDictionary[value] - 1,
    });

    onChange(newArray);
  };

  return (
    <Wrapper>
      {items.map(({ isChecked, value }, index) => (
        <Container key={`t${index}`}>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              value={value}
              {...rest}
              onChange={(event) => handleChange(event, value)}
              defaultChecked={isChecked}
            />
          </CheckboxWrapper>
          <LabelWrapper>
            <Label>{value}</Label>
          </LabelWrapper>
        </Container>
      ))}
      <HelperTextWrapper>
        {fieldState.error && (
          <HelperText text={fieldState.error.message}></HelperText>
        )}
      </HelperTextWrapper>
    </Wrapper>
  );
};

export default CheckboxWithLabel;
