import React from 'react';
import { Wrapper, Text } from './Tag.style';

interface TagProps {
  name: string;
  backgroundColor?: string;
  color?: string;
}

const Tag = ({
  name,
  backgroundColor = 'white',
  color = 'black',
}: TagProps): JSX.Element => {
  return (
    <Wrapper>
      <Text backgroundColor={backgroundColor} color={color}>
        {name}
      </Text>
    </Wrapper>
  );
};

export default Tag;
