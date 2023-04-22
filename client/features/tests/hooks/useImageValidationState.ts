import { useState } from 'react';

type ScoreTestResultImageUrl =
  `scoreTestResultFormItems.${number}.resultImageUrl`;

const useImageValidationState = () => {
  const [validImageUrl, setValidImageUrl] = useState<string>('');
  const [validImageName, setValidImageName] =
    useState<ScoreTestResultImageUrl>(null);
  const [validImageIndex, setValidImageIndex] = useState<number | null>(null);

  const setImageValidationState = (
    imgUrl: string,
    name: ScoreTestResultImageUrl,
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
