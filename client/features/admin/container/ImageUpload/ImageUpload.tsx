import React, { useRef, useState } from 'react';
import { Container, Button, Input, Img } from './ImageUpload.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';

interface ImgUploadProps {
  handleImgFile: (imgFile: File) => void;
}

const ImgUpload = ({ handleImgFile }: ImgUploadProps): JSX.Element => {
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const { imgUrl } = useSelector(
    (state: RootState) => ({
      imgUrl: state.admin.imgUrl,
    }),
    shallowEqual,
  );

  const [imgSrc, setImgSrc] = useState<string>(
    imgUrl ? imgUrl : 'imageholder.png',
  );

  const handleClick = (): void => {
    imgUploadRef.current.click();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files[0]) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
      handleImgFile(event.target.files[0]);
    }
  };

  return (
    <Container>
      <Input
        type="file"
        ref={imgUploadRef}
        accept={'image/*'}
        onChange={onImageChange}
      />
      <Img alt={'img'} src={imgSrc} />
      <Button onClick={handleClick}>썸네일 등록</Button>
    </Container>
  );
};

export default ImgUpload;
