import React, { useCallback } from 'react';
import Wrapper from './styles';
import SelectButton from './SelectButton';
import InputForm from '../InputForm';
import SelectForm from './SelectForm';
import AdminButton from '../AdminButton';
import _mapObject from '../../utils/_mapObject';
import { Items } from './type';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import {
  handlerSelectInput,
  transSelectItem,
  deleteSelectItem,
  addSelectItem,
  approveSelectItem,
} from '../../store/modules/admin';

const SelectContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const { items, isResultScreen, isVisible } = useSelector(
    (state: RootState) => ({
      items: state.admin.items,
      isResultScreen: state.admin.isResultScreen,
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const onChange = useCallback((event): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;

    dispatch(handlerSelectInput({ name, value, index }));
  }, []);

  const handleOk = (index: number): void => {
    const { question, select_1, select_2 } = items[index];
    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch(transSelectItem({ index }));
  };

  const handleDelete = useCallback((index: number): void => {
    dispatch(deleteSelectItem({ index }));
  }, []);

  const handleAdd = useCallback((): void => {
    dispatch(addSelectItem());
  }, []);

  const handleApprove = (): void => {
    const isCheck = isVisible.filter((data) => data === true);

    if (isCheck.length) {
      alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
      return;
    }

    dispatch(approveSelectItem());
  };

  const pretreatment = useCallback((key, items, index) => {
    return {
      label:
        key === 'question'
          ? `${index + 1}번질문`
          : key === 'select_1'
          ? '1번선택지'
          : '2번선택지',
      input: key,
      defaultValue: items[key],
    };
  }, []);

  return (
    <Wrapper>
      {items.map((data, index) => {
        const item = _mapObject(pretreatment, data, index);
        return (
          <div key={'selectItem' + `${index}`}>
            {isVisible[index] === true ? (
              <InputForm
                handleChange={onChange}
                num={index}
                item={item}
              ></InputForm>
            ) : (
              <SelectForm item={item}></SelectForm>
            )}

            {!isResultScreen && (
              <SelectButton
                handleOk={handleOk}
                handleDelete={handleDelete}
                index={index}
                isVisible={isVisible}
              />
            )}
          </div>
        );
      })}
      {isResultScreen === false && (
        <AdminButton
          leftButton={handleAdd}
          rightButton={handleApprove}
          leftName={'추가'}
          rightName={'완료'}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(SelectContainer);

// import React from 'react';
// import Wrapper from './styles';
// import SelectInput from './SelectInput';
// import SelectButton from './SelectButton';
// import InputForm from '../InputForm';
// import SelectForm from './SelectForm';
// import _mapObject from '../../utils/_mapObject';
// import { Items } from './type';

// interface SelectProps {
//   handleOk: (index: number) => void;
//   handleDelete: (index: number) => void;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   index: number;
//   data: Items;
//   isVisible: boolean;
//   isResultScreen: boolean;
// }

// const SelectContainer = ({
//   handleOk,
//   handleDelete,
//   onChange,
//   index,
//   data,
//   isVisible,
//   isResultScreen,
// }: SelectProps): JSX.Element => {
//   console.log('확인', index, data, isVisible);
//   const pretreatment = (key, items, index) => {
//     return {
//       label:
//         key === 'question'
//           ? `${index + 1}번질문`
//           : key === 'select_1'
//           ? '1번선택지'
//           : '2번선택지',
//       input: key,
//       defaultValue: items[key],
//     };
//   };

//   const item = _mapObject(pretreatment, data, index);
//   console.log('!!!');
//   return (
//     <Wrapper>
//       {isVisible === true ? (
//         <InputForm handleChange={onChange} num={index} item={item}></InputForm>
//       ) : (
//         <SelectForm item={item}></SelectForm>
//       )}

//       {!isResultScreen && (
//         <SelectButton
//           handleOk={handleOk}
//           handleDelete={handleDelete}
//           index={index}
//           isVisible={isVisible}
//         />
//       )}
//     </Wrapper>
//   );
// };

// export default React.memo(SelectContainer);
