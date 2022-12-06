import { useState } from 'react';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  CREATE_USER_ITEM_STEP,
  CREATE_SELECT_ITEMS_STEP,
  CREATE_RESULT_ITEMS_STEP,
} from '../../admin.const';
import {
  useImageUploadStep,
  useResultStep,
  useSelectStep,
} from '../../admin.hook';
import UserForm from '../../components/UserForm/UserForm';
import ImageUpload from '../ImageUpload/ImageUpload';
import ResultCard from '../ResultCard/ResultCard';
import SelectCard from '../SelectCard/SelectCard';
import TitleForm from '../TitleForm/TitleForm';
import { ButtonWrapper, Container, SubTitle } from './StepForm.style';
import { SubTitleType } from './StepForm.type';

const StepForm = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [subTitle] = useState<SubTitleType>({
    0: '유저등록',
    1: '제목',
    2: '이미지 등록',
    3: '선택지 작성',
    4: '결과작성',
  });

  const { imgFile, handleImgFile } = useImageUploadStep();
  const { isSelectItemsVisible, createResultItems } = useSelectStep();
  const { handleSubmit } = useResultStep(imgFile);

  const handlePrev = () => {
    if (step === CREATE_USER_ITEM_STEP) return;
    setStep((step) => step - 1);
  };

  const handleNext = () => {
    if (step === CREATE_SELECT_ITEMS_STEP) {
      if (!isSelectItemsVisible()) {
        alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
        return;
      }
      createResultItems();
    }

    if (step === CREATE_RESULT_ITEMS_STEP) {
      handleSubmit();
      return;
    }

    setStep((step) => step + 1);
  };

  return (
    <Container>
      <SubTitle>{subTitle[step]}</SubTitle>

      {step === 0 && <UserForm />}
      {step === 1 && <TitleForm />}
      {step === 2 && <ImageUpload handleImgFile={handleImgFile} />}
      {step === 3 && <SelectCard />}
      {step === 4 && <ResultCard />}

      <ButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
