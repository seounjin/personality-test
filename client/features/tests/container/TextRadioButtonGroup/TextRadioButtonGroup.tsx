import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import HelperText from '../../../../components/HelperText/HelperText';
import TextRadioButton from '../../components/TextRadioButton/TextRadioButton';
import { HelperTextWrapper } from '../SetWeightSection/SetWeightSection.style';
import { Fieldset } from './TextRadioButtonGroup.style';
import { RadioButtonItems } from './TextRadioButtonGroup.type';

interface RadioGroupProps {
  items: RadioButtonItems[];
  name: string;
  numberOfItemsIndex: number;
  radioButtonIndex: string;
}

const TextRadioButtonGroup = ({
  items,
  name,
  numberOfItemsIndex,
  radioButtonIndex,
}: RadioGroupProps): JSX.Element => {
  const { setValue, getValues } = useFormContext();
  const { field } = useController({ name });

  const setWeightedScoreItems = (data) =>
    data.map((item) => ({ ...item, score: item.score ? 0 : 1 }));

  const handleRadioButton = () => {
    const mbtiSelectFormItem = getValues(
      `mbtiSelectFormItems[${numberOfItemsIndex}]`,
    );

    const firstWeightedScoreItems = setWeightedScoreItems(
      mbtiSelectFormItem.optionItems[0].weightedScoreItems,
    );

    const secondWeightedScoreItems = setWeightedScoreItems(
      mbtiSelectFormItem.optionItems[1].weightedScoreItems,
    );

    setValue(
      `mbtiSelectFormItems[${numberOfItemsIndex}].optionItems[${0}].weightedScoreItems`,
      firstWeightedScoreItems,
    );
    setValue(
      `mbtiSelectFormItems[${numberOfItemsIndex}].optionItems[${1}].weightedScoreItems`,
      secondWeightedScoreItems,
    );
  };

  return (
    <Fieldset>
      {items.map(({ text, id, htmlFor }, index) => {
        return (
          <TextRadioButton
            key={id}
            {...field}
            text={text}
            id={id}
            htmlFor={htmlFor}
            defaultChecked={parseInt(radioButtonIndex) === index}
            index={index}
            onClick={handleRadioButton}
          />
        );
      })}
    </Fieldset>
  );
};

export default TextRadioButtonGroup;
