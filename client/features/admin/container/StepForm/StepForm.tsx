import { useState } from 'react';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import { useAdmin } from '../../admin.hook';
import UserForm from '../../components/UserForm/UserForm';
import ImageUpload from '../ImageUpload/ImageUpload';
import ResultCard from '../ResultCard/ResultCard';
import SelectCard from '../SelectCard/SelectCard';
import TitleForm from '../TitleForm/TitleForm';
import { ButtonWrapper, Container, SubTitle } from './StepForm.style';

interface StepFormProps {
  step: number;
  onPrev: () => void;
  onNext: () => void;
}

const StepForm = ({ step, onPrev, onNext }: StepFormProps): JSX.Element => {
  const { imgFile, handleImgFile } = useAdmin();
  const [subTitle] = useState({
    0: '유저등록',
    1: '제목',
    2: '이미지 등록',
    3: '선택지 작성',
    4: '결과작성',
  });

  return (
    <Container>
      <SubTitle>{subTitle[step]}</SubTitle>

      {step === 0 && <UserForm />}
      {step === 1 && <TitleForm />}
      {step === 2 && <ImageUpload handleImgFile={handleImgFile} />}
      {step === 3 && <SelectCard />}
      {step === 4 && <ResultCard ImgFile={imgFile} />}

      <ButtonWrapper>
        <TwoButton
          leftButton={onPrev}
          rightButton={onNext}
          leftName={'이전'}
          rightName={'다음'}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
