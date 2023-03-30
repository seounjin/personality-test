import React from 'react';
import { Wrapper, Block } from './Spinner.style';

const Spinner = () => {
  return (
    <Wrapper className="lds-ring">
      <Block />
      <Block />
      <Block />
    </Wrapper>
  );
};

export default Spinner;
