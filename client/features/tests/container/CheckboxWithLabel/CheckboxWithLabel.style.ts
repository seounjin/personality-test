import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 260px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

export const CheckboxWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

export const Checkbox = styled.input``;

export const LabelWrapper = styled.div`
  flex: 1;
  line-height: 20px;
`;

export const Label = styled.label`
  font-size: 1.5rem;
`;
