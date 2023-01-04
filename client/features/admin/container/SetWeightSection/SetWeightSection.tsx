import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import SetScoreButton from '../../components/SetScoreButton/SetScoreButton';
import {
  Container,
  Label,
  LabelWrapper,
  Wrapper,
} from './SetWeightSection.style';

interface SetWeightSectionRrops {
  name: string;
}

const SetWeightSection = ({ name }: SetWeightSectionRrops): JSX.Element => {
  const { control, setValue, getValues } = useFormContext();

  const items = useWatch({ control, name: name });

  const getWeightedScoreItems = () => [...getValues(name)];

  const inCreaseScore = (index: number) => {
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
      {items.map(({ type, score }, index) => (
        <Wrapper key={index}>
          <LabelWrapper>
            <Label>{type}</Label>
          </LabelWrapper>
          <SetScoreButton
            score={score}
            minScore={0}
            maxScore={10}
            onLeftButtonClick={() => decreaseScore(index)}
            onRightButtonClick={() => inCreaseScore(index)}
          />
        </Wrapper>
      ))}
    </Container>
  );
};

export default SetWeightSection;
