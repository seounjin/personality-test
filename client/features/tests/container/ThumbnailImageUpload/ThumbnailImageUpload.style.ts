import styled from 'styled-components';

export const Label = styled.label`
  float: left;
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 200;
`;

export const Container = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const Input = styled.input`
  display: none;
`;

export const Button = styled.button`
  width: 296px;
  height: 40px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.previewButtonColor};
`;

export const CancleButton = styled(Button)`
  margin-top: 10px;
`;
