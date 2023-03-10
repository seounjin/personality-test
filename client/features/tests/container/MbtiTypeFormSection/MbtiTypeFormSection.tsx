import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TypeForm from '../../components/TypeForm/TypeForm';
import { Form, Container } from '../TypeFormSection/TypeFormSection.style';
import {
  setMbtiSelctFormItems,
  setMbtiTypeFormItems,
} from '../../../../store/modules/tests';
import { useDispatch } from 'react-redux';
import { TypeFormItems } from '../../components/TypeForm/TypeForm.type';
import useStorage from '../../hooks/useStorage';

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

  const { setTestsItems } = useStorage();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { mbtiTypeFormItems } = data;

    setTestsItems({ resultItems: mbtiTypeFormItems });
    dispatch(
      setMbtiTypeFormItems({ mbtiTypeFormItems: [...mbtiTypeFormItems] }),
    );
    dispatch(setMbtiSelctFormItems());

    handleNext();
  };

  return (
    <Form id="mbtiTypeForm" onSubmit={handleSubmit(onSubmit)}>
      <Container>
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
      </Container>
    </Form>
  );
};

export default MbtiTypeFormSection;
