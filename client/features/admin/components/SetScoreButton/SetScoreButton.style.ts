import styled from 'styled-components';
import leftSquareMinusSvgIcon from '../../../../assets/icons/square-minus-regular.svg';
import rightSquareMinusSvgIcon from '../../../../assets/icons/square-plus-regular.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface SquareIconProps {
  isDisabled: boolean;
}

export const LeftMinusIcon = styled(leftSquareMinusSvgIcon)<SquareIconProps>`
  fill: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.buttonHoverColor : theme.colors.buttonColor};
  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const RightPlusIcon = styled(rightSquareMinusSvgIcon)<SquareIconProps>`
  fill: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.buttonHoverColor : theme.colors.buttonColor};
  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const Button = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: white;
  padding: 0;
`;

export const ScoreWrapper = styled.div`
  width: 28px;
  margin: 0 6px;
  display: flex;
  justify-content: center;
  padding-top: 4px;
`;

export const Score = styled.span`
  font-size: 1.5rem;
`;
