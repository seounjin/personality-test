import React from 'react';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import { Container, Text, TwoButtonWrapper } from './SetTestsModal.style';

interface SetTestsModalProps {
  handleCheckButton: () => void;
  handleCloseModal: () => void;
}

const SetTestsModal = ({
  handleCheckButton,
  handleCloseModal,
}: SetTestsModalProps): JSX.Element => {
  return (
    <Container>
      <Text>{'이전에 작성한 데이터가 있습니다.이어서 작성하시겠습니까?'}</Text>

      <TwoButtonWrapper>
        <TwoButton
          leftButton={handleCheckButton}
          leftType="button"
          leftName={'예'}
          rightButton={handleCloseModal}
          rightType="button"
          rightName={'아니오'}
        />
      </TwoButtonWrapper>
    </Container>
  );
};

export default SetTestsModal;
