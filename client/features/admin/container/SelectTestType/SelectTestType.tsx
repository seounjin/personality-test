import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setTestType } from '../../../../store/modules/admin';
import { TEST_TYPE_DATA } from '../../admin.const';
import TestTypeButton from '../../components/TestTypeButton/TestTypeButton';
import {
  ButtonContainer,
  ButtonWrapper,
  Container,
} from './SelectTestType.style';

const SelectTestType = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTypeButton = (testType: string) => {
    dispatch(setTestType({ testType: testType }));
    router.push(`?test=${testType}`, undefined, { shallow: true });
  };

  return (
    <Container>
      <ButtonContainer>
        {TEST_TYPE_DATA.map(({ id, title, text, imgSrc, testType }) => (
          <ButtonWrapper key={id}>
            <TestTypeButton
              title={title}
              text={text}
              imgSrc={imgSrc}
              testType={testType}
              onClick={handleTypeButton}
            />
          </ButtonWrapper>
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default SelectTestType;
