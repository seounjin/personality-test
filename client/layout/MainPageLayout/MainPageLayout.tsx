import { ReactNode } from 'react';
import { Wrapper, HiddenWrapper } from './MainPageLayout.style';

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout = ({ children }: MainPageLayoutProps): JSX.Element => {
  return (
    <Wrapper>
      <HiddenWrapper>{children}</HiddenWrapper>
    </Wrapper>
  );
};

export default MainPageLayout;
