import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SetCounterButtonWrapper = styled.div`
  margin-bottom: 40px;
`;

export const SubTitle = styled.h2`
  font-size: 1.7rem;
`;

export const TwoButtonWrapper = styled.div`
  button {
    background-color: #9e7676;
    &:hover:enabled {
      background-color: #e3caa5;
    }
  }
`;
