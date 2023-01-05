import React, { ReactNode } from 'react';
import { Container, Title, TitleWrapper } from './TextBoxSection.style';

interface TextBoxTitleProps {
  title: string;
  titleLocation: string;
  children: ReactNode;
}

const TextBoxSection = ({
  title = '',
  titleLocation = 'start',
  children,
}: TextBoxTitleProps): JSX.Element => {
  return (
    <Container>
      <TitleWrapper justifyContent={titleLocation}>
        <Title>{title}</Title>
      </TitleWrapper>
      {children}
    </Container>
  );
};

export default TextBoxSection;
