import styled from 'styled-components';
import nextIcon from '../../../../assets/icons/angle-right-solid.svg';
import prevIcon from '../../../../assets/icons/angle-left-solid.svg';

export const Container = styled.div``;

export const Body = styled.div``;

export const Title = styled.h1`
  font-size: 16px;
`;

export const ContentWrapper = styled.ul`
  margin: 0;
  margin-top: 20px;
  padding-left: 20px;
  font-size: 14px;
`;

export const Content = styled.li`
  margin-bottom: 8px;
`;

export const Page = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

export const TwoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

interface PrevIconProps {
  isDisabled: boolean;
}

export const PrevIcon = styled(prevIcon)<PrevIconProps>`
  width: 20px;
  height: 20px;
  fill: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.buttonHoverColor
      : theme.colors.angleLeftSolidColor};

  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

interface NextIconProps {
  isDisabled: boolean;
}

export const NextIcon = styled(nextIcon)<NextIconProps>`
  width: 20px;
  height: 20px;
  fill: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.buttonHoverColor
      : theme.colors.angleRightSolidColor};
  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const Button = styled.button`
  border: none;
  background: white;
  padding: 0;
  margin: 0 5px;
`;
