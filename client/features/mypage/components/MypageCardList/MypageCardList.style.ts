import styled from 'styled-components';
import shareSvg from '../../../../assets/icons/share.svg';

export const ButtonContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: start;

  button: nth-child(2) {
    margin: 0 8px;
  }
`;

export const Button = styled.button`
  width: 50px;
  height: 80px;
  padding: 0;
  border: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mypageBackgroundColor};
`;

export const GrayCircle = styled.span`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGray};

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const DeleteEimoji = styled(GrayCircle)`
  &::before {
    content: '🗑';
    font-size: 20px;
  }
`;

export const EditEimoji = styled(GrayCircle)`
  &::before {
    content: '✏️';
    font-size: 20px;
  }
`;

export const ShareSvgIcon = styled(shareSvg)``;
