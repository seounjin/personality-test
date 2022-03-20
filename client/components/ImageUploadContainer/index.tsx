import React, { useRef, useState } from 'react';
import Wrapper from './styles';

interface ImgUploadProps {
  imgUrl?: string;
  handleImgUpload: (imgFile: File) => void;
}

const ImageUploadContainer = ({
  imgUrl,
  handleImgUpload,
}: ImgUploadProps): JSX.Element => {
  const imgUploadRef = useRef<HTMLInputElement>(null);
  const [ImgSrc, setImgSrc] = useState<string>(
    imgUrl ? imgUrl : 'imageholder.png',
  );

  const handleClick = (): void => {
    imgUploadRef.current.click();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImgSrc(URL.createObjectURL(event.target.files[0]));
    handleImgUpload(event.target.files[0]);
  };

  return (
    <Wrapper>
      <input
        type="file"
        ref={imgUploadRef}
        accept={'image/*'}
        onChange={onImageChange}
      />
      <img src={ImgSrc} />

      <button onClick={handleClick}>썸네일 등록</button>
    </Wrapper>
  );
};

export default React.memo(ImageUploadContainer);
