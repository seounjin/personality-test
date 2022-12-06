import {
  TitleWrapper,
  Title,
  Wrapper,
  Container,
} from '../../features/admin/admin.styles';
import { useState } from 'react';
import StepForm from '../../features/admin/container/StepForm/StepForm';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import { approveSelectItem } from '../../store/modules/admin';
import {
  CREATE_SELECT_ITEMS_STEP,
  FIRST_STEP,
} from '../../features/admin/admin.const';

const Admin = (): JSX.Element => {
  const dispatch = useDispatch();

  const { selectItemsVisible } = useSelector(
    (state: RootState) => ({
      selectItemsVisible: state.admin.selectItemsVisible,
    }),
    shallowEqual,
  );
  const [step, setStep] = useState(0);

  const isSelectItemsVisible = () =>
    selectItemsVisible.every((data: boolean) => data);

  const onPrev = () => {
    if (step === FIRST_STEP) return;
    setStep((step) => step - 1);
  };

  const onNext = () => {
    if (step === CREATE_SELECT_ITEMS_STEP) {
      if (!isSelectItemsVisible()) {
        alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
        return;
      }
      dispatch(approveSelectItem());
    }
    setStep((step) => step + 1);
  };

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>만들어 보아요</Title>
        </TitleWrapper>
        <StepForm step={step} onPrev={onPrev} onNext={onNext} />
      </Container>
    </Wrapper>
  );
};

export default Admin;
