import { useEffect } from 'react';

interface ScrollTopProps {
  activeStep: number;
}

const ScrollTop = ({ activeStep }: ScrollTopProps): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);
  return null;
};

export default ScrollTop;
