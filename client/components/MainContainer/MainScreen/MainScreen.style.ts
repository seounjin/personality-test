import styled from 'styled-components';

interface ContainerProps {
  opacity: number;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s;

  width: 100%;
  height: 100%;
  font-size: 1.6rem;
`;

export const QuestionWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export const Question = styled.div`
  width: 276px;
  text-align: center;
  padding: 40px 40px 0 40px;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 280px;
  height: 72px;
  border: none;
  border-radius: 22px;
`;

export const WhiteButton = styled(Button)`
  background-color: #f1f1f1;
  margin-bottom: 20px;
`;

export const BlueButton = styled(Button)`
  background-color: #5963ff;
  color: white;
`;
