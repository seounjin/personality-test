import { useState } from 'react';
import {
  MbtiTestResultImageUrl,
  ScoreTestResultImageUrl,
  TrueOrFalseTestResultImageUrl,
} from '../tests.types';

const useImageValidationState = () => {
  const [validImageUrl, setValidImageUrl] = useState<string>('');
  const [validImageName, setValidImageName] = useState<
    | ScoreTestResultImageUrl
    | MbtiTestResultImageUrl
    | TrueOrFalseTestResultImageUrl
  >(null);
  const [validImageIndex, setValidImageIndex] = useState<number | null>(null);

  const setImageValidationState = (
    imgUrl: string,
    name:
      | ScoreTestResultImageUrl
      | MbtiTestResultImageUrl
      | TrueOrFalseTestResultImageUrl,
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
