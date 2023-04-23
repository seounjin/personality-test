import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import { TF_TEST_RESULT_FORM_ID } from './trueOrFalse.const';
import { setTrueOrFalseTestResultFormItems } from './trueOrFalse.slice';
import TrueOrFalseTestResultWriter from './TrueOrFalseTestResultWriter';
import { TrueOrFalseTestResultFormValues } from './trueOrFalseTest.type';
import useStorage from '../../hooks/useStorage';
import { createTrueOrFalseTestResultFormItems } from './trueOrFalse.utils';

interface TrueOrFalseResultFormProps {
  handleNext: () => void;
}

const TrueOrFalseTestResultForm = ({
  handleNext,
}: TrueOrFalseResultFormProps): JSX.Element => {
  const { control, trigger, handleSubmit, setValue } =
    useFormContext<TrueOrFalseTestResultFormValues>();
  const { fields } = useFieldArray({
    control,
    name: 'trueOrFalseTestResultFormItems',
  });

  const dispatch = useDispatch();

  const { mode, trueOrFalseTestSelectFormItems } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      trueOrFalseTestSelectFormItems:
        state.trueOrFalseTest.trueOrFalseTestSelectFormItems,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const res = createTrueOrFalseTestResultFormItems(
      trueOrFalseTestSelectFormItems,
      fields.length ? fields : [],
    );

    setValue('trueOrFalseTestResultFormItems', res);
  }, []);

  const { setTestItems } = useStorage();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;

    const { trueOrFalseTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({
        resultItems: trueOrFalseTestResultFormItems,
      });
    }

    dispatch(setTrueOrFalseTestResultFormItems(data));

    handleNext();
  };

  return (
    <FormLayout id={TF_TEST_RESULT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map(
          (
            { id, resultContent, explanationContent, selectedOption },
            index,
          ) => (
            <TrueOrFalseTestResultWriter
              key={id}
              index={index}
              firstLabel={'유 형'}
              firstContent={resultContent}
              firstInputDisalbed={false}
              secondLabel={'설 명'}
              secondContent={explanationContent}
              selectedOption={selectedOption}
              name={'trueOrFalseTestResultFormItems'}
            />
          ),
        )}
    </FormLayout>
  );
};

export default TrueOrFalseTestResultForm;
