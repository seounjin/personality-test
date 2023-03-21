import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../../../components/Modal/Modal';
import { setBasicInformationItems } from '../../../../store/modules/tests';
import useStorage from '../../hooks/useStorage';
import { Wrapper } from '../../tests.styles';
import { setMbtiTestItems } from '../MbtiTestTypeContainer/mbtiTestType.slice';
import { setScoreTestItems } from '../ScoreTestTypeContainer/scoreTestType.slice';
import SetTestsModal from '../SetTestsModal/SetTestsModal';
import Stepper from '../Stepper/Stepper';
import { setTrueOrFalseTestItems } from '../TrueOrFalseTestContainer/trueOrFalse.slice';

interface StepperContainerProps {
  testType: string;
}

const StepperContainer = ({ testType }: StepperContainerProps): JSX.Element => {
  const { getTestItems, getKey } = useStorage();
  const [isOpenStepper, setIsOpenStepper] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [testsItems, setTestItems] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const items = getTestItems();
    if (items) {
      setTestItems(items);
      setIsOpenModal(true);
    } else {
      setIsOpenStepper(true);
    }
  }, []);

  const handleCheckButton = () => {
    dispatch(setBasicInformationItems({ data: testsItems }));
    if (testType === 'score') {
      dispatch(setScoreTestItems({ data: testsItems }));
    } else if (testType === 'mbti') {
      dispatch(setMbtiTestItems({ data: testsItems }));
    } else if (testType === 'trueOrFalse') {
      dispatch(setTrueOrFalseTestItems({ data: testsItems }));
    }

    setIsOpenModal(false);
    setIsOpenStepper(true);
  };

  const handleCloseModal = () => {
    const key = getKey();
    localStorage.removeItem(key);
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
