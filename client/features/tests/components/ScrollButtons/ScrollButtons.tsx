import React from 'react';
import useScrollButton from '../../hooks/useScrollButton';
import {
  Wrapper,
  ArrowUpSolidIcon,
  Button,
  ArrowDownSolidIcon,
} from './ScrollButtons.style';

const ScrollButtons = (): JSX.Element => {
  const { isScrollButtonVisible, scrollToTop, scrollToBottom } =
    useScrollButton();

  return (
    <Wrapper>
      <Button
        aria-label="스크롤 위로 버튼"
        onClick={scrollToTop}
        isScrollButtonVisible={isScrollButtonVisible}
      >
        <ArrowUpSolidIcon />
      </Button>
      <Button
        aria-label="스크롤 아래로 버튼"
        onClick={scrollToBottom}
        isScrollButtonVisible={isScrollButtonVisible}
      >
        <ArrowDownSolidIcon />
      </Button>
    </Wrapper>
  );
};

export default ScrollButtons;
