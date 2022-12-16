import React from 'react';
import { Container, SubTitleWrapper, SubTitle } from './BoxShadowCard.style';

interface BoxShadowCardProps {
  subtitle: string;
  children: React.ReactNode;
}

const BoxShadowCard = ({
  subtitle,
  children,
}: BoxShadowCardProps): JSX.Element => {
  return (
    <Container>
      <SubTitleWrapper>
        <SubTitle>{subtitle}</SubTitle>
      </SubTitleWrapper>
      {children}
    </Container>
  );
};

export default BoxShadowCard;
