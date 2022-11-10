import { useState } from 'react';
import { InputForm } from '../components/InputForm/InputForm.type';
import { SelectItem } from '../components/SelectCard/SelectCard.type';
import _mapObject from '../utils/_mapObject';

type ParseItem = InputForm;

interface useParseItemProps {
  item: SelectItem[];
  index: number;
}

const useParseItem = ({ item, index }: useParseItemProps): ParseItem[] => {
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

export default useParseItem;
