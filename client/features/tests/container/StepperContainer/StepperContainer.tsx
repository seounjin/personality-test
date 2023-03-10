import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../../components/Modal/Modal';
import {
  setMbtiTypeTestItems,
  setScoreTypeTestItems,
} from '../../../../store/modules/tests';
import useStorage from '../../hooks/useStorage';
import { Wrapper } from '../../tests.styles';
import SetTestsModal from '../SetTestsModal/SetTestsModal';
import Stepper from '../Stepper/Stepper';

interface StepperContainerProps {
  testType: string;
}

const StepperContainer = ({ testType }: StepperContainerProps): JSX.Element => {
  const { getTestsItems } = useStorage();
  const [isOpenStepper, setIsOpenStepper] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [testsItems, setTestsItems] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const items = getTestsItems();
    if (items) {
      setTestsItems(items);
      setIsOpenModal(true);
      return;
    } else {
      setIsOpenStepper(true);
    }
  }, []);

  const handleCheckButton = () => {
    if (testType === 'score') {
      dispatch(setScoreTypeTestItems({ data: testsItems }));
    } else if (testType === 'mbti') {
      dispatch(setMbtiTypeTestItems({ data: testsItems }));
    }

    setIsOpenModal(false);
    setIsOpenStepper(true);
  };

  const handleCloseModal = () => {
    localStorage.removeItem(testType);
    setIsOpenModal(false);
    setIsOpenStepper(true);
  };

  return (
    <Wrapper>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <SetTestsModal
            handleCheckButton={handleCheckButton}
            handleCloseModal={handleCloseModal}
          />
        </Modal>
      )}
      {isOpenStepper && <Stepper testType={testType} />}
    </Wrapper>
  );
};

export default StepperContainer;
