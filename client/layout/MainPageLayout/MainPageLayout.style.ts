import styled from 'styled-components';
import { SCREEN_WIDTH } from '../../features/personalityTest/personalityTest.const';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;

export const HiddenWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${SCREEN_WIDTH};
  overflow: hidden;
`;
