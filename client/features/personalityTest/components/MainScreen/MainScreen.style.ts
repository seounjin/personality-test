import styled from 'styled-components';
import qSolidSvgIcon from '../../../../assets/icons/q-solid.svg';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
  border: solid;
  background-color: white;
  font-size: 20px;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Question = styled.span``;

export const ButtonWrapper = styled.div`
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

export const OptionButton = styled(Button)`
  background-color: #f1f1f1;
  margin-bottom: 20px;
`;

export const QuestionIconWrapper = styled.div`
  margin-right: 10px;
`;
export const QuestionIcon = styled(qSolidSvgIcon)`
  width: 20px;
  hegiht: 20px;
`;
