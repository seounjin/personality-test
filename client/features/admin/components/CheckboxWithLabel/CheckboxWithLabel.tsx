import React from 'react';
import { useController, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { setTypeItemsCount } from '../../../../store/modules/admin';
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
  const dispatch = useDispatch();
  const { typeDictionary } = useSelector(
    (state: RootState) => ({
      typeDictionary: state.admin.typeDictionary,
    }),
    shallowEqual,
  );

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

    dispatch(setTypeItemsCount({ key: value, count: isChecked ? 1 : -1 }));

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
