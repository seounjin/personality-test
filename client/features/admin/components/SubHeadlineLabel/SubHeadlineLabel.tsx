import React from 'react';
import { Label, Wrapper } from './SubHeadlineLabel.style';

interface SubHeadlineLabelProps {
  label: string;
  subTitleLocation: string;
}

const SubHeadlineLabel = ({
  label,
  subTitleLocation,
}: SubHeadlineLabelProps): JSX.Element => {
  return (
    <Wrapper justifyContent={subTitleLocation}>
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default SubHeadlineLabel;
