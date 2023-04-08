import styled from 'styled-components';

export const ButtonContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: end;
`;

const CircleButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  background-color: #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DeleteButton = styled(CircleButton)`
  margin-right: 8px;
  &::before {
    content: '🗑';
    font-size: 20px;
  }
`;

export const EditButton = styled(CircleButton)`
  margin-right: 8px;
  &::before {
    content: '✏️';
    font-size: 20px;
  }
`;

export const ShareButton = styled(CircleButton)`
  &::before {
    content: '📤';
    font-size: 20px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonTag = styled.span`
  margin-top: 10px;
  font-size: 16px;
`;
