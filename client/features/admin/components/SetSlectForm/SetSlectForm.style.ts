import styled from 'styled-components';
import leftArrowSvgIcon from '../../../../assets/icons/circle-chevron-left-solid.svg';
import rightArrowSvgIcon from '../../../../assets/icons/circle-chevron-right-solid.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 40px 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100%;
  margin: 10px 0;
`;

interface ArrowIconProps {
  isDisabled: boolean;
}

export const LeftArrowIcon = styled(leftArrowSvgIcon)<ArrowIconProps>`
  fill: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.buttonHoverColor : theme.colors.black};
  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const RightArrowIcon = styled(rightArrowSvgIcon)<ArrowIconProps>`
  fill: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.buttonHoverColor : theme.colors.black};
  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: white;
  padding: 0;
`;

export const Input = styled.input`
  width: 32px;
  height: 30px;
  margin: 0 4px;
  text-align: center;
  border: solid 2px black;
`;

export const Label = styled.label`
  font-size: 18px;
`;
