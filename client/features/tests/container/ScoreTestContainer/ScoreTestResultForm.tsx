import { useRouter } from 'next/router';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import DeleteAlertModal from '../../../../components/DeleteAlertModal/DeleteAlertModal';
import Modal from '../../../../components/Modal/Modal';
import { useFetcher } from '../../../../hooks/useFetcher';
import useModal from '../../../../hooks/useModal';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultFormBox from '../../components/ResultFormBox/ResultFormBox';
import ResultWriter from '../../components/ResultWriter/ResultWriter';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import useImageValidationState from '../../hooks/useImageValidationState';
import useStorage from '../../hooks/useStorage';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import { SetCounterButtonWrapper } from '../../tests.styles';
import { ScoreTestResultImageUrl } from '../../tests.types';
import {
  actionImageCompress,
  isValidImageUrl,
  parseS3Url,
  validateImageFile,
} from '../../tests.util';
import {
  MAX_TYPE_ITEMS_COUNT,
  MIN_TYPE_ITEMS_COUNT,
  SCORE_TEST_RESULT_FORM_ID,
} from './scoreTest.const';
import {
  setScoreTestResultFormItems,
  setScoreTestResultItemsCount,
  setInitScoreTestSelectFormItems,
  setImageBase64DataArray,
  popImageBase64Data,
  pushImageBase64Data,
} from './scoreTest.slice';
import { ScoreTestResultFormItems } from './scoreTest.type';

interface TypeFormSectionProps {
  handleNext: () => void;
}

const ScoreTestResultForm = ({
  handleNext,
}: TypeFormSectionProps): JSX.Element => {
  const router = useRouter();
  const fetcher = useFetcher();
  const {
    validImageUrl,
    validImageName,
    validImageIndex,
    setImageValidationState,
  } = useImageValidationState();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { control, trigger, handleSubmit, setValue } =
    useFormContext<ScoreTestResultFormItems>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'scoreTestResultFormItems',
  });
  const { scoreTestResultItemsCount, mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      scoreTestResultItemsCount: state.scoreTest.scoreTestResultItemsCount,
    }),
    shallowEqual,
  );
  const { setTestItems } = useStorage();

  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (MIN_TYPE_ITEMS_COUNT === scoreTestResultItemsCount) return;
    if (mode === 'update') {
      if (
        isValidImageUrl(fields[scoreTestResultItemsCount - 1].resultImageUrl)
      ) {
        alert(`${scoreTestResultItemsCount}번 이미지를 삭제해주세요!`);
        return;
      }
    }

    dispatch(setScoreTestResultItemsCount({ count: -1 }));
    remove(scoreTestResultItemsCount - 1);
    dispatch(popImageBase64Data());
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === scoreTestResultItemsCount) return;
    dispatch(setScoreTestResultItemsCount({ count: 1 }));
    append({
      resultContent: '',
      explanationContent: '',
      resultImageUrl: IMAGE_HOLDER_PATH,
    });
    dispatch(pushImageBase64Data());
  };

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { scoreTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({
        resultItems: scoreTestResultFormItems.map((data) => ({
          ...data,
          resultImageUrl: IMAGE_HOLDER_PATH,
        })),
      });
    }

    dispatch(
      setScoreTestResultFormItems({
        scoreTestResultFormItems: [...scoreTestResultFormItems],
      }),
    );
    dispatch(
      setInitScoreTestSelectFormItems({
        scoreTestResultFormItems: [...scoreTestResultFormItems],
      }),
    );
    handleNext();
  };

  const onError = (errors) => {
    if (!errors.scoreTestResultFormItems.message) return;
    alert(errors.scoreTestResultFormItems.message);
  };

  const onImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: ScoreTestResultImageUrl,
    index: number,
  ) => {
    const file = event.target.files[0];

    if (!validateImageFile(file)) {
      return;
    }

    try {
      const { compressedFile, imageBase64Data } = await actionImageCompress(
        file,
      );
      dispatch(setImageBase64DataArray({ index, imageBase64Data }));
      setValue(name, URL.createObjectURL(compressedFile));
    } catch (error) {
      alert('잠시 후 다시 시도해주세요');
    }
  };

  const handleCancel = (
    name: ScoreTestResultImageUrl,
    index: number,
    imgUrl: string,
  ) => {
    if (isValidImageUrl(imgUrl)) {
      setImageValidationState(imgUrl, name, index);
      openModal();
      return;
    }
    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setImageBase64DataArray({ index, imageBase64Data: '' }));
  };

  const requestDelete = async () => {
    const { bucketName, imagePath } = parseS3Url(validImageUrl);
    const id = router.query.slug[0];
    const res = await fetcher(
      'delete',
      `/personality/${id}/score-result-image?bucketName=${bucketName}&imagePath=${imagePath}&index=${validImageIndex}`,
    );

    closeModal();
    if (res.success) {
      alert('이미지가 삭제 되었습니다.');
      setValue(validImageName as ScoreTestResultImageUrl, IMAGE_HOLDER_PATH);
    } else {
      alert('죄송합니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <FormLayout
      id={SCORE_TEST_RESULT_FORM_ID}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'유형 수 설정'}
          count={scoreTestResultItemsCount}
          onLeftButtonClick={handleDecrease}
          onRightButtonClick={handleIncrease}
          minCount={MIN_TYPE_ITEMS_COUNT}
          maxCount={MAX_TYPE_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>
      {fields.map(({ id, resultContent, explanationContent }, index) => (
        <ResultFormBox key={id} numberling={`${index + 1}번`}>
          <ImageUpload
            name={`scoreTestResultFormItems[${index}].resultImageUrl`}
            onImageChange={onImageChange}
            handleCancel={handleCancel}
            index={index}
          />
          <ResultWriter
            index={index}
            firstLabel={'유 형'}
            firstContent={resultContent}
            secondLabel={'설 명'}
            secondContent={explanationContent}
            name={'scoreTestResultFormItems'}
          />
        </ResultFormBox>
      ))}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DeleteAlertModal
            handleConfirm={requestDelete}
            handleClose={closeModal}
            textA={
              '삭제하시면 해당 이미지는 복구 할 수 없습니다. 삭제하시겠습니까?'
            }
          />
        </Modal>
      )}
    </FormLayout>
  );
};

export default ScoreTestResultForm;
