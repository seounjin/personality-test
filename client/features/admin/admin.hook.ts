import { useState, useEffect } from 'react';
import { reSetAdminData } from '../../store/modules/admin';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import { InputForm } from '../../components/InputForm/InputForm.type';
import _mapObject from '../../utils/_mapObject';
import { SelectItem } from './container/SelectCard/SelectCard.type';

export const useAdmin = () => {
  const [imgFile, setImgFile] = useState<File>(null);
  const dispatch = useDispatch();

  const handleImgFile = (imgFile: File) => {
    setImgFile(imgFile);
  };

  const { isResultScreen } = useSelector(
    (state: RootState) => ({
      isResultScreen: state.admin.isResultScreen,
    }),
    shallowEqual,
  );

  useEffect(() => {
    return () => {
      dispatch(reSetAdminData());
    };
  }, []);

  return { imgFile, isResultScreen, handleImgFile };
};

type ParseItem = InputForm;

interface useParseItemProps {
  item: SelectItem[];
  index: number;
}

export const useParseItem = ({
  item,
  index,
}: useParseItemProps): ParseItem[] => {
  const pretreatment = (key: string, items: SelectItem[], index: number) => ({
    label:
      key === 'question'
        ? `${index + 1}번질문`
        : key === 'select_1'
        ? '1번선택지'
        : '2번선택지',
    type: key,
    defaultValue: items[key],
  });

  const [parsetItem] = useState<ParseItem[]>(
    _mapObject(pretreatment, item, index),
  );

  return parsetItem;
};
