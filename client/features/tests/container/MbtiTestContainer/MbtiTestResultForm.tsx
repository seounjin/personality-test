import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import ResultWriter from '../../components/ResultWriter/ResultWriter';
import useStorage from '../../hooks/useStorage';
import { ResultFormItem } from '../../tests.types';
import { MBTI_TEST_RESULT_FORM_ID } from './mbtiTest.const';
import {
  setInitMbtiSelctFormItems,
  setmbtiTestResultFormItems,
} from './mbtiTest.slice';

type mbtiTestResultFormItemsValues = {
  mbtiTestResultFormItems: ResultFormItem[];
};

interface MbtiTestResultFormProps {
  handleNext: () => void;
}

const MbtiTestResultForm = ({
  handleNext,
}: MbtiTestResultFormProps): JSX.Element => {
  const { control, trigger, handleSubmit } =
    useFormContext<mbtiTestResultFormItemsValues>();
  const { fields } = useFieldArray({
    control,
    name: 'mbtiTestResultFormItems',
  });

  const { setTestItems } = useStorage();

  const dispatch = useDispatch();

  const { mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
    }),
    shallowEqual,
  );

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { mbtiTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({ resultItems: mbtiTestResultFormItems });
    }

    dispatch(
      setmbtiTestResultFormItems({
        mbtiTestResultFormItems: [...mbtiTestResultFormItems],
      }),
    );
    dispatch(setInitMbtiSelctFormItems());

    handleNext();
  };

  return (
    <FormLayout id={MBTI_TEST_RESULT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id, resultContent, explanationContent }, index) => (
        <ResultWriter
          key={id}
          index={index}
          firstLabel={'유 형'}
          firstContent={resultContent}
          firstInputDisalbed={true}
          secondLabel={'설 명'}
          secondContent={explanationContent}
          name={'mbtiTestResultFormItems'}
        />
      ))}
    </FormLayout>
  );
};

export default MbtiTestResultForm;
