import styled from 'styled-components';

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 0;
  font-size: 1.5rem;
`;

export const Textarea = styled.textarea`
  width: 340px;
  height: 240px;
  resize: none;
  outline: none;
  margin: 4px 0;
  padding: 8px;
  border: ${(props) => props.theme.colors.boxShadowBorderColor} solid 2px;
  border-radius: 4px;
  &:focus {
    border-color: ${(props) => props.theme.colors.textAreaFocusColor};
  }
`;
