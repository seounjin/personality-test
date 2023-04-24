import React from 'react';
import { BarsSolidIcon, Wrapper } from './BarsIcon.style';

interface BarsIconProps {
  onClick: () => void;
}

const BarsIcon = ({ onClick }: BarsIconProps): JSX.Element => {
  return (
    <Wrapper type="button" aria-label="메뉴 버튼" onClick={onClick}>
      <BarsSolidIcon />
    </Wrapper>
  );
};

export default BarsIcon;
