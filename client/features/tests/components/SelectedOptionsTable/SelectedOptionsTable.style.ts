import styled from 'styled-components';
import ArrowRightSvgIcon from '../../../../assets/icons/arrow-right-solid.svg';
import ArrowDownSvgIcon from '../../../../assets/icons/arrow-down-solid.svg';

interface WrapperProps {
  isOpen: boolean;
}

type DetailButtonProps = WrapperProps;

export const Container = styled.div`
  width: 100%;
  margin: 20px 0;
`;

export const HeadBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
`;

export const HeadLine = styled.h3`
  font-size: 19px;
`;

export const DeatilButton = styled.button<DetailButtonProps>`
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ isOpen, theme }) =>
    !isOpen
      ? theme.colors.detailButtonColor
      : theme.colors.detailButtonHoverColor};
  border: none;
  border-radius: 20px;
  transition: background-color 0.3s ease;

  height: 40px;

  &: hover {
    background-color: ${({ theme }) => theme.colors.detailButtonHoverColor};
  }
`;

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: ${({ isOpen }) => (isOpen ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const QuestionText = styled.p`
  font-size: 18px;
`;

export const OptionText = styled.p`
  font-size: 18px;
`;

export const TextArea = styled.div``;

export const ArrowRightIconWrapper = styled.div`
  margin: 20px;
`;

export const ArrowRightIcon = styled(ArrowRightSvgIcon)`
  width: 20px;
  height: 20px;
`;

export const ArrowDownIcon = styled(ArrowDownSvgIcon)`
  width: 20px;
  height: 20px;
`;
