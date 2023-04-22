import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultFormBox from '../../components/ResultFormBox/ResultFormBox';
import ResultWriter from '../../components/ResultWriter/ResultWriter';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import useStorage from '../../hooks/useStorage';
import { IMAGE_HOLDER_PATH, MAX_FILE_SIZE } from '../../tests.const';
import { SetCounterButtonWrapper } from '../../tests.styles';
import { actionImageCompress, isImageFile } from '../../tests.util';
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
    name: `scoreTestResultFormItems.${number}.resultImageUrl`,
    index: number,
  ) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!isImageFile(file.name)) {
      alert('허용되지 않은 파일 형식입니다.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('최대 이미지 용량은 2mb입니다.');
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
    name: `scoreTestResultFormItems.${number}.resultImageUrl`,
    index,
  ) => {
    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setImageBase64DataArray({ index, imageBase64Data: '' }));
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
    </FormLayout>
  );
};

export default ScoreTestResultForm;
