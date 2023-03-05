import { ReactNode, forwardRef } from 'react';
import { Wrapper } from './SlideWrapper.style';

interface SlideWrapperProps {
  children: ReactNode;
}

const SlideWrapper = forwardRef<HTMLDivElement, SlideWrapperProps>(
  ({ children }, ref): JSX.Element => {
    return <Wrapper ref={ref}>{children}</Wrapper>;
  },
);

SlideWrapper.displayName = 'SlideWrapper';

export default SlideWrapper;
