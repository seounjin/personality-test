import styled from 'styled-components';
import qSolidSvgIcon from '../../../../assets/icons/q-solid.svg';

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
  border: solid;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
`;

export const QuestionWrapper = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Question = styled.span`
  line-height: normal;
`;

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
  background-color: ${({ theme }) => theme.colors.optionButtonColor};
  margin-bottom: 20px;
`;

export const QuestionIconWrapper = styled.div`
  margin: 20px 0;
  font-size: 30px;
  .question_icon {
    margin-right: 4px;
  }
`;
export const QuestionIcon = styled(qSolidSvgIcon)`
  width: 20px;
  hegiht: 20px;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
