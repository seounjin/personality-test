import { useState, useCallback } from 'react';

export const useImageUploadStep = () => {
  const [imgFile, setImgFile] = useState<File>(null);

  const handleImgFile = useCallback((imgFile: File) => {
    setImgFile(imgFile);
  }, []);

  return { imgFile, handleImgFile };
};
