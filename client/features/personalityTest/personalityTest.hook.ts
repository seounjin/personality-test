import { useRef, useState, useEffect } from 'react';
import { InputForm } from '../../components/InputForm/InputForm.type';
import { SelectItem } from '../../features/admin/container/SelectCard/SelectCard.type';
import _mapObject from '../../utils/_mapObject';

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

export const useSlide = () => {
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    slideRef.current.style.transition = 'transform 1s';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const resetSlide = () => {
    slideRef.current.style.transition = 'none';
    slideRef.current.style.transform = `translateX(0)`;
    setCurrentSlide(0);
  };

  return { slideRef, currentSlide, nextSlide, resetSlide };
};
