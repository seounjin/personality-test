import styled from 'styled-components';

export const Input = styled.input``;

export const Span = styled.span``;

export const Label = styled.label`
  font-size: 15px;
  line-height: 20px;
  padding: 10px;

  &: hover {
    cursor: pointer;
  }

  input[type='radio'] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    vertical-align: bottom;
    border: 2px solid ${({ theme }) => theme.colors.buttonColor};

    &: hover {
      cursor: pointer;
    }
  }

  input[type='radio']: checked {
    border: 5px solid ${({ theme }) => theme.colors.buttonColor};
  }
`;
