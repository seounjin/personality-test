import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 8px;
  margin-bottom: 40px;
`;

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
`;

export const NumberLabel = styled.label`
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 280px;
  height: 36px;
  margin: 4px 0;
  padding-left: 8px;
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const Textarea = styled.textarea`
  width: 280px;
  height: 130px;
  resize: none;
  border: none;
  outline: none;
  margin: 4px 0;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const HeaderWrapper = styled.div`
  font-size: 1.8rem;
  margin: 4px 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 0;
  font-size: 1.8rem;
`;

export const TextareaContainer = styled(InputContainer)``;
