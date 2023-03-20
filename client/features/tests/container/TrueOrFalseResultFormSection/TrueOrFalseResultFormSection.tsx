import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form } from '../TypeFormSection/TypeFormSection.style';
import { setTrueOrFalseResultFormItems } from '../../../../store/modules/tests';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { createTrueOrFalseResultFormItems } from '../../tests.util';
import TrueOrFalseResultForm from '../TrueOrFalseResultForm/TrueOrFalseResultForm';
import { TrueOrFalseResultFormValues } from './TrueOrFalseResultFormSection.type';

interface TrueOrFalseResultFormSectionProps {
  handleNext: () => void;
}

const TrueOrFalseResultFormSection = ({
  handleNext,
}: TrueOrFalseResultFormSectionProps): JSX.Element => {
  const { control, trigger, handleSubmit, setValue } =
    useFormContext<TrueOrFalseResultFormValues>();
  const { fields } = useFieldArray({
    control,
    name: 'trueOrFalseResultFormItems',
  });

  const dispatch = useDispatch();

  const { trueOrFalseSelectFormItems } = useSelector(
    (state: RootState) => ({
      trueOrFalseSelectFormItems: state.tests.trueOrFalseSelectFormItems,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const res = createTrueOrFalseResultFormItems(
      trueOrFalseSelectFormItems,
      fields.length ? fields : [],
    );

    setValue('trueOrFalseResultFormItems', res);
  }, []);

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    dispatch(setTrueOrFalseResultFormItems(data));
    handleNext();
  };

  return (
    <Form id="trueOrFalseResultForm" onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map(
          ({ id, typeContent, explanationContent, selectedOption }, index) => (
            <TrueOrFalseResultForm
              key={id}
              index={index}
              firstLabel={'유 형'}
              firstContent={typeContent}
              firstInputDisalbed={false}
              secondLabel={'설 명'}
              secondContent={explanationContent}
              selectedOption={selectedOption}
              name={'trueOrFalseResultFormItems'}
            />
          ),
        )}
    </Form>
  );
};

export default TrueOrFalseResultFormSection;
