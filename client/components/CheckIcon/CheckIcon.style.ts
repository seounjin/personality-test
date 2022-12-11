import styled, { keyframes } from 'styled-components';
import { CHECK_ICON_DASHOFFSET } from './CheckIcons.const';

export const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const stroke = keyframes`
  0% {
    stroke-dashoffset: ${CHECK_ICON_DASHOFFSET};
  }
  100% {
    stroke-dashoffset: 0px;
  }
`;

export const PolyLine = styled.polyline`
  fill: none;
  stroke: #fff;
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: ${CHECK_ICON_DASHOFFSET};
  animation: ${stroke} 0.5s ease;
`;
