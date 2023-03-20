import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TypeForm from '../../components/ResultWriter/ResultWriter';
import { Form } from '../TypeFormSection/TypeFormSection.style';
import {
  setMbtiSelctFormItems,
  setMbtiTypeFormItems,
} from '../../../../store/modules/tests';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TypeFormItems } from '../../components/ResultWriter/ResultWriter.type';
import useStorage from '../../hooks/useStorage';
import { RootState } from '../../../../store/modules';

type MbtiTypeItemValues = {
  mbtiTypeFormItems: TypeFormItems[];
};

interface TypeFormSectionProps {
  handleNext: () => void;
}

const MbtiTypeFormSection = ({
  handleNext,
}: TypeFormSectionProps): JSX.Element => {
  const { control, trigger, handleSubmit } =
    useFormContext<MbtiTypeItemValues>();
  const { fields } = useFieldArray({
    control,
    name: 'mbtiTypeFormItems',
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
    const { mbtiTypeFormItems } = data;

    if (mode === 'create') {
      setTestItems({ resultItems: mbtiTypeFormItems });
    }

    dispatch(
      setMbtiTypeFormItems({ mbtiTypeFormItems: [...mbtiTypeFormItems] }),
    );
    dispatch(setMbtiSelctFormItems());

    handleNext();
  };

  return (
    <Form id="mbtiTypeForm" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id, typeContent, explanationContent }, index) => (
        <TypeForm
          key={id}
          index={index}
          firstLabel={'유 형'}
          firstContent={typeContent}
          firstInputDisalbed={true}
          secondLabel={'설 명'}
          secondContent={explanationContent}
          name={'mbtiTypeFormItems'}
        />
      ))}
    </Form>
  );
};

export default MbtiTypeFormSection;
