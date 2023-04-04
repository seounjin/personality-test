import styled from 'styled-components';
import { SCREEN_WIDTH } from '../../features/tests/tests.const';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const HiddenWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${SCREEN_WIDTH};
  height: 100%;
  overflow: hidden;
`;
