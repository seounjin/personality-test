import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;

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
  width: 280px;
  height: 28px;
  margin: 4px 0 4px 0;
  border: rgba(27, 31, 35, 0.15) solid 1.7px;
  outline: none;
  border-radius: 2px;
`;
