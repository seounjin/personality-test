import styled from 'styled-components';
import questionIcon from '../../../../assets/icons/circle-question-solid.svg';

export const Wrapper = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  background: white;
  padding: 0;
`;

export const QuestionIcon = styled(questionIcon)`
  fill: ${({ theme }) => theme.colors.questionMarkColor};

  &:hover {
    fill: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;
