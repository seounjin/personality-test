import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../tests.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import TypeForm from '../../components/TypeForm/TypeForm';
import {
  Form,
  Container,
  SetCounterButtonWrapper,
} from './TypeFormSection.style';
import {
  setSelctFormItems,
  setTypeFormItems,
  setTypeItemsCount,
} from '../../../../store/modules/tests';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { TypeItemValues } from '../../components/TypeForm/TypeForm.type';
import { RootState } from '../../../../store/modules';
import useStorage from '../../hooks/useStorage';

interface TypeFormSectionProps {
  handleNext: () => void;
}

const TypeFormSection = ({ handleNext }: TypeFormSectionProps): JSX.Element => {
  const { control, trigger, handleSubmit } = useFormContext<TypeItemValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'typeFormItems',
  });
  const { typeItemsCount, mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      typeItemsCount: state.tests.typeItemsCount,
    }),
    shallowEqual,
  );
  const { setTestItems } = useStorage();

  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (MIN_TYPE_ITEMS_COUNT === typeItemsCount) return;
    dispatch(setTypeItemsCount({ count: -1 }));
    remove(typeItemsCount - 1);
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === typeItemsCount) return;
    dispatch(setTypeItemsCount({ count: 1 }));
    append({
      typeContent: '',
      explanationContent: '',
    });
  };

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { typeFormItems } = data;

    if (mode === 'create') {
      setTestItems({ resultItems: typeFormItems });
    }

    dispatch(setTypeFormItems({ typeFormItems: [...typeFormItems] }));
    dispatch(setSelctFormItems({ typeFormItems: [...typeFormItems] }));
    handleNext();
  };

  const onError = (errors) => {
    if (!errors.typeFormItems.message) return;
    alert(errors.typeFormItems.message);
  };

  return (
    <Form id="typeForm" onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <SetCounterButtonWrapper>
          <SetCounterButton
            label={'유형 수 설정'}
            count={typeItemsCount}
            onLeftButtonClick={handleDecrease}
            onRightButtonClick={handleIncrease}
            minCount={MIN_TYPE_ITEMS_COUNT}
            maxCount={MAX_TYPE_ITEMS_COUNT}
          />
        </SetCounterButtonWrapper>
        {fields.map(({ id, typeContent, explanationContent }, index) => (
          <TypeForm
            key={id}
            index={index}
            firstLabel={'유 형'}
            firstContent={typeContent}
            secondLabel={'설 명'}
            secondContent={explanationContent}
            name={'typeFormItems'}
          />
        ))}
      </Container>
    </Form>
  );
};

export default TypeFormSection;
