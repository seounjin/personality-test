import React from 'react';
import { useController, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { handleChangeTypeDictionary } from '../../../../store/modules/tests';
import HelperText from '../../../../components/HelperText/HelperText';
import { HelperTextWrapper } from '../../../../components/TextFiled/TextFiled.style';
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
  const dispatch = useDispatch();

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

    dispatch(
      handleChangeTypeDictionary({ type: value, count: isChecked ? 1 : -1 }),
    );

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
