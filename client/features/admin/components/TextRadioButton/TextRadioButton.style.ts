import styled from 'styled-components';

export const Wrapper = styled.div`
  input[type='radio'] + label {
    display: inline-block;
    cursor: pointer;
    height: 40px;
    width: 280px;
    border: 1px solid ${({ theme }) => theme.colors.buttonColor};
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    margin: 10px;
    font-size: 15px;
  }

  input[type='radio']: checked + label {
    background-color: ${({ theme }) => theme.colors.buttonColor};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const TextRadio = styled.input`
  display: none;
`;

export const Label = styled.label``;
