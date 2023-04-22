import React from 'react';
import TwoButton from '../TwoButton/TwoButton';
import {
  TextWrapper,
  TwoButtonWrapper,
  Container,
  Text,
} from './DeleteAlertModal.style';

interface DeleteModalProps {
  handleConfirm: () => void;
  handleClose: () => void;
  textA?: string;
  textB?: string;
}

const DeleteModal = ({
  handleConfirm,
  handleClose,
  textA,
  textB,
}: DeleteModalProps): JSX.Element => {
  return (
    <Container>
      <TextWrapper>
        <Text>{textA}</Text>
        <Text>{textB}</Text>
      </TextWrapper>
      <TwoButtonWrapper>
        <TwoButton
          leftName="확인"
          rightName="취소"
          leftButton={handleConfirm}
          rightButton={handleClose}
        />
      </TwoButtonWrapper>
    </Container>
  );
};

export default DeleteModal;
