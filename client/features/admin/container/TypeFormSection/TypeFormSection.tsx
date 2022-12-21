import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import TypeForm from '../../components/TypeForm/TypeForm';
import { Container, SetCounterButtonWrapper } from './TypeFormSection.style';
import { FormData } from '../StepForm/StepForm.type';

const TypeFormSection = () => {
  const { control } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'typeFormItems',
  });

  const [count, setCount] = useState<number>(MIN_TYPE_ITEMS_COUNT);

  const handleDecrease = () => {
    if (MIN_TYPE_ITEMS_COUNT === count) return;
    remove(count - 1);
    setCount((count) => count - 1);
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === count) return;
    append({
      labelType: '유형',
      typeContent: '',
      labelExplanation: '설명',
      explanationContent: '',
    });
    setCount((count) => count + 1);
  };

  return (
    <Container>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'유형 수 설정'}
          count={count}
          onLeftButtonClick={handleDecrease}
          onRightButtonClick={handleIncrease}
          minCount={MIN_TYPE_ITEMS_COUNT}
          maxCount={MAX_TYPE_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>
      {fields.map(
        (
          { id, labelType, typeContent, labelExplanation, explanationContent },
          index,
        ) => {
          return (
            <TypeForm
              key={id}
              index={index}
              firstLabel={labelType}
              firstContent={typeContent}
              secondLabel={labelExplanation}
              secondContent={explanationContent}
            />
          );
        },
      )}
    </Container>
  );
};

export default TypeFormSection;

// import React, { useCallback, useState } from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../../store/modules';
// import {
//   addTypeItems,
//   removeTypeItems,
//   setTypeItems,
// } from '../../../../store/modules/admin';
// import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../admin.const';
// import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
// import TypeForm from '../../components/TypeForm/TypeForm';
// import { Container, SetCounterButtonWrapper } from './TypeFormSection.style';

// const TypeFormSection = () => {
//   const [count, setCount] = useState<number>(MIN_TYPE_ITEMS_COUNT);
//   const dispatch = useDispatch();
//   const { typeItems } = useSelector(
//     (state: RootState) => ({
//       typeItems: state.admin.typeItems,
//     }),
//     shallowEqual,
//   );

//   const handleDecrease = () => {
//     if (MIN_TYPE_ITEMS_COUNT === count) return;

//     dispatch(removeTypeItems());

//     setCount((count) => count - 1);
//   };

//   const handleIncrease = () => {
//     if (MAX_TYPE_ITEMS_COUNT === count) return;
//     dispatch(addTypeItems());

//     setCount((count) => count + 1);
//   };

//   const handleInput = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>): void => {
//       const {
//         value,
//         dataset: { index },
//       } = event.target;

//       dispatch(setTypeItems({ key: 'typeContent', value, index }));
//     },
//     [],
//   );

//   const handleTextarea = useCallback(
//     (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
//       const {
//         value,
//         dataset: { index },
//       } = event.target;

//       dispatch(setTypeItems({ key: 'explanationContent', value, index }));
//     },
//     [],
//   );

//   return (
//     <Container>
//       <SetCounterButtonWrapper>
//         <SetCounterButton
//           label={'유형 수 설정'}
//           count={count}
//           onLeftButtonClick={handleDecrease}
//           onRightButtonClick={handleIncrease}
//           minCount={MIN_TYPE_ITEMS_COUNT}
//           maxCount={MAX_TYPE_ITEMS_COUNT}
//         />
//       </SetCounterButtonWrapper>
//       {typeItems.map(
//         (
//           { labelType, typeContent, labelExplanation, explanationContent },
//           index,
//         ) => (
//           <TypeForm
//             key={`t${index}`}
//             index={index}
//             firstLabel={labelType}
//             firstContent={typeContent}
//             secondLabel={labelExplanation}
//             secondContent={explanationContent}
//             handleInput={handleInput}
//             handleTextarea={handleTextarea}
//           />
//         ),
//       )}
//     </Container>
//   );
// };

// export default TypeFormSection;
