import styled from 'styled-components';
import { SCREEN_WIDTH } from '../../personalityTest.const';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${SCREEN_WIDTH};
  height: 100%;
  font-size: 20px;
`;

export const Button = styled.button`
  background-color: transparent;
  height: 52px;
  border: none;
  margin-top: 30px;
`;

export const Headline = styled.h2``;
