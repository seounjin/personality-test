import React, { useRef, useState } from 'react';
import Wrapper from './styles';
import { useDispatch } from 'react-redux';

interface ImgUploadProps {
  handleImgFile: (imgFile: File) => void;
}

const ImageUploadContainer = ({
  handleImgFile,
}: ImgUploadProps): JSX.Element => {
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const [ImgSrc, setImgSrc] = useState<string>('imageholder.png');

  const handleClick = (): void => {
    imgUploadRef.current.click();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImgSrc(URL.createObjectURL(event.target.files[0]));
    handleImgFile(event.target.files[0]);
  };

  return (
    <Wrapper>
      <input
        type="file"
        ref={imgUploadRef}
        accept={'image/*'}
        onChange={onImageChange}
      />
      <img alt={'img'} src={ImgSrc} />

      <button onClick={handleClick}>썸네일 등록</button>
    </Wrapper>
  );
};

export default React.memo(ImageUploadContainer);
