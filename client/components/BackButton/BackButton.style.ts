import styled from 'styled-components';
import angleLeftSolidIcon from '../../assets/icons/angle-left-solid.svg';

export const Button = styled.button`
  display: none;
  border: none;
  background: white;
  padding: 0;

  ${({ theme }) =>
    theme.device.laptop`
display: inline;`}
`;

export const NoneBlock = styled.div`
display: none;
${({ theme }) =>
  theme.device.laptop`
display: inline;`}
  }
`;

export const AngleLeftSolidIcon = styled(angleLeftSolidIcon)`
  width: 25px;
  height: 25px;
`;
