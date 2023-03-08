import styled from 'styled-components';

export const Wrapepr = styled.div``;

export const BarWrapper = styled.div`
  position: relative;
  width: 260px;
`;

const BasicBar = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 8px;
`;
export const BeheindBar = styled(BasicBar)`
  background-color: ${({ theme }) => theme.colors.basicProgressBarColor};
`;

interface ForwardBarProps {
  width: number;
}

export const ForwardBar = styled(BasicBar)<ForwardBarProps>`
  position: absolute;
  width: ${({ width }) => width}%;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.startButtonColor};
`;

export const TextWrapper = styled.div`
  text-align: right;
`;
export const Text = styled.span``;
