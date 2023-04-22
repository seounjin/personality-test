import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  input[type='password'] {
    font-family: 'Malgun gothic', dotum, sans-serif;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
`;
export const Label = styled.label`
  margin: 4px 0 4px 0;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 340px;
  height: 34px;
  padding-left: 10px;
  margin: 4px 0 4px 0;
  border: ${(props) => props.theme.colors.basicFontColor} solid 2px;
  outline: none;
  border-radius: 4px;
  &:focus {
    border-color: ${(props) => props.theme.colors.textFiledFocusColor};
  }
`;

export const HelperTextWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding-left: 6px;
`;
