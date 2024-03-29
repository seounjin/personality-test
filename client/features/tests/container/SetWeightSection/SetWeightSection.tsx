import React from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import HelperText from '../../../../components/HelperText/HelperText';
import SetScoreButton from '../../components/SetScoreButton/SetScoreButton';
import {
  Container,
  Label,
  LabelWrapper,
  Wrapper,
  HelperTextWrapper,
} from './SetWeightSection.style';

interface SetWeightSectionRrops {
  name: string;
}

const SetWeightSection = ({ name }: SetWeightSectionRrops): JSX.Element => {
  const { control, setValue, getValues } = useFormContext();
  const { fieldState } = useController({ name });
  const items = useWatch({ control, name: name });

  const getWeightedScoreItems = () => [...getValues(name)];

  const increaseScore = (index: number) => {
    const weightedScoreItems = getWeightedScoreItems();
    weightedScoreItems[index].score += 1;
    setValue(name, weightedScoreItems);
  };

  const decreaseScore = (index: number) => {
    const weightedScoreItems = getWeightedScoreItems();
    weightedScoreItems[index].score -= 1;
    setValue(name, weightedScoreItems);
  };

  return (
    <Container>
      {items.map(({ resultContent, score }, index) => (
        <Wrapper key={`t${index}`}>
          <LabelWrapper>
            <Label>{resultContent}</Label>
          </LabelWrapper>
          <SetScoreButton
            score={score}
            minScore={0}
            maxScore={10}
            onLeftButtonClick={() => decreaseScore(index)}
            onRightButtonClick={() => increaseScore(index)}
          />
        </Wrapper>
      ))}
      <HelperTextWrapper>
        {fieldState.error && <HelperText text={fieldState.error.message} />}
      </HelperTextWrapper>
    </Container>
  );
};

export default SetWeightSection;
