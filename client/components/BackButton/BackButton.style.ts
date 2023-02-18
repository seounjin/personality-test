import styled from 'styled-components';
import angleLeftSolidIcon from '../../assets/icons/angle-left-solid.svg';

export const Wrapper = styled.button`
  border: none;
  background: white;
  padding: 0;
  display: none;
  ${({ theme }) =>
    theme.device.laptop`
display: inline;`}
`;

export const AngleLeftSolidIcon = styled(angleLeftSolidIcon)`
  width: 25px;
  height: 25px;
`;
