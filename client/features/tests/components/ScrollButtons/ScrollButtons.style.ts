import styled from 'styled-components';
import arrowUpSolidSvgIcon from '../../../../assets/icons/arrow-up-solid.svg';
import arrowDownSolidSvgIcon from '../../../../assets/icons/arrow-down-solid.svg';

interface ButtonProps {
  isScrollButtonVisible: boolean;
}

export const Wrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;

  button: first-child {
    margin-bottom: 10px;
  }
`;

export const Button = styled.button<ButtonProps>`
  display: ${({ isScrollButtonVisible }) =>
    isScrollButtonVisible ? 'block' : 'none'};
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 50%;
  padding: 10px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  svg {
    fill: ${({ theme }) => theme.colors.scrollButtonColor};
  }
`;
export const ArrowUpSolidIcon = styled(arrowUpSolidSvgIcon)``;
export const ArrowDownSolidIcon = styled(arrowDownSolidSvgIcon)``;
