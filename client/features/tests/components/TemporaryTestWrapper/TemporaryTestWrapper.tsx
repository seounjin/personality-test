import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  Overlay,
  XMarkIcon,
} from '../../../../components/Modal/Modal.style';
import useBodyOverflow from '../../../../hooks/useBodyOverflow';
import { HiddenWrapper } from '../../../../layout/MainPageLayout/MainPageLayout.style';

export const XMarkIconWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 30px;
  cursor: pointer;
  z-index: 1000;
`;

interface TemporaryTestWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

const TemporaryTestWrapper = ({
  children,
  onClose,
}: TemporaryTestWrapperProps): JSX.Element => {
  useBodyOverflow();
  return (
    <Wrapper>
      <Overlay onClick={onClose} />
      <HiddenWrapper>
        <XMarkIconWrapper onClick={onClose}>
          <XMarkIcon />
        </XMarkIconWrapper>
        {children}
      </HiddenWrapper>
    </Wrapper>
  );
};

export default TemporaryTestWrapper;
