import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setTestType } from '../../../../store/modules/tests';
import { ButtonContainer, Container } from './SelectTestType.style';
import TestTypeButtonsSkeleton from '../../components/TestTypeButtonsSkeleton/TestTypeButtonsSkeleton';
import dynamic from 'next/dynamic';

const TestTypeButtons = dynamic(
  () => import('../../components/TestTypeButtons/TestTypeButtons'),
  {
    ssr: false,
    loading: () => <TestTypeButtonsSkeleton />,
  },
);

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
        <TestTypeButtons onClick={handleTypeButton} />
      </ButtonContainer>
    </Container>
  );
};

export default SelectTestType;
