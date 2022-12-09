import { useState } from 'react';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  CREATE_USER_ITEM_STEP,
  CREATE_SELECT_ITEMS_STEP,
  CREATE_RESULT_ITEMS_STEP,
  CREATE_TITLE_ITEM_STEP,
  IMAGE_UPLOAD_STEP,
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

const STEP_LABEL = [
  { id: 'l1', label: '회원정보' },
  { id: 'l2', label: '제목' },
  { id: 'l3', label: '이미지 업로드' },
  { id: 'l4', label: '선택지 만들기' },
  { id: 'l5', label: '결과지 만들기' },
];

const StepForm = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [isStepActive, setIsStepActive] = useState(
    STEP_LABEL.map((_, index) => (index === 0 ? true : false)),
  );

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

    const rawArray = [...isStepActive];
    rawArray[step] = false;
    setIsStepActive(rawArray);
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
      return;
    }

    const rawArray = [...isStepActive];
    rawArray[step + 1] = true;
    setIsStepActive(rawArray);
    setStep((step) => step + 1);
  };

  return (
    <Container>
      <SubTitle>{subTitle[step]}</SubTitle>

      <StepIndicator isStepActive={isStepActive} stepLabel={STEP_LABEL} />

      {step === CREATE_USER_ITEM_STEP && <UserForm />}
      {step === CREATE_TITLE_ITEM_STEP && <TitleForm />}
      {step === IMAGE_UPLOAD_STEP && (
        <ImageUpload handleImgFile={handleImgFile} />
      )}
      {step === CREATE_SELECT_ITEMS_STEP && <SelectCard />}
      {step === CREATE_RESULT_ITEMS_STEP && (
        <ResultCard onSubmit={handleSubmit} />
      )}

      <ButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={step === CREATE_USER_ITEM_STEP ? true : false}
          rightDisabled={step === CREATE_RESULT_ITEMS_STEP ? true : false}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
