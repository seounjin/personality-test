import React from 'react';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  TextWrapper,
  TwoButtonWrapper,
  Container,
  Text,
} from './DeleteAlertModal.style';

interface DeleteModalProps {
  handleConfirm: () => void;
  handleClose: () => void;
}

const DeleteModal = ({
  handleConfirm,
  handleClose,
}: DeleteModalProps): JSX.Element => {
  return (
    <Container>
      <TextWrapper>
        <Text>{'삭제하면 복구할수 없습니다'}</Text>
        <Text>{'정말 삭제하겠습니까?'}</Text>
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
