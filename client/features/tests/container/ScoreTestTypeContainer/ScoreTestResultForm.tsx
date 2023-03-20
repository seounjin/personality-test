import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import ResultWriter from '../../components/ResultWriter/ResultWriter';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import useStorage from '../../hooks/useStorage';
import { SetCounterButtonWrapper } from '../../tests.styles';
import {
  MAX_TYPE_ITEMS_COUNT,
  MIN_TYPE_ITEMS_COUNT,
  SCORE_TEST_RESULT_FORM_ID,
} from './scoreTestType.const';
import {
  setScoreTestResultFormItems,
  setScoreTestResultItemsCount,
  setInitScoreTestSelectFormItems,
} from './scoreTestType.slice';
import { ScoreTestResultFormItems } from './scoreTestType.type';

interface TypeFormSectionProps {
  handleNext: () => void;
}

const ScoreTestResultForm = ({
  handleNext,
}: TypeFormSectionProps): JSX.Element => {
  const { control, trigger, handleSubmit } =
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
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === scoreTestResultItemsCount) return;
    dispatch(setScoreTestResultItemsCount({ count: 1 }));
    append({
      resultContent: '',
      explanationContent: '',
    });
  };

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { scoreTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({ scoreTestResultFormItems: scoreTestResultFormItems });
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
        <ResultWriter
          key={id}
          index={index}
          firstLabel={'유 형'}
          firstContent={resultContent}
          secondLabel={'설 명'}
          secondContent={explanationContent}
          name={'scoreTestResultFormItems'}
        />
      ))}
    </FormLayout>
  );
};

export default ScoreTestResultForm;
