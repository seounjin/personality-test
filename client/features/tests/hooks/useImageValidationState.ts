import { useState } from 'react';
import {
  MbtiTestResultImageUrl,
  ScoreTestResultImageUrl,
} from '../tests.types';

const useImageValidationState = () => {
  const [validImageUrl, setValidImageUrl] = useState<string>('');
  const [validImageName, setValidImageName] = useState<
    ScoreTestResultImageUrl | MbtiTestResultImageUrl
  >(null);
  const [validImageIndex, setValidImageIndex] = useState<number | null>(null);

  const setImageValidationState = (
    imgUrl: string,
    name: ScoreTestResultImageUrl | MbtiTestResultImageUrl,
    index: number,
  ) => {
    setValidImageUrl(imgUrl);
    setValidImageName(name);
    setValidImageIndex(index);
  };

  return {
    validImageUrl,
    validImageName,
    validImageIndex,
    setImageValidationState,
  };
};

export default useImageValidationState;
