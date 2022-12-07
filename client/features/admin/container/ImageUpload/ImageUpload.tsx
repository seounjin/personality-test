import React, { useRef } from 'react';
import { Container, Button, Input, Img } from './ImageUpload.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { setImageUrl } from '../../../../store/modules/admin';
import { useDispatch } from 'react-redux';

interface ImgUploadProps {
  handleImgFile: (imgFile: File) => void;
}

const ImgUpload = ({ handleImgFile }: ImgUploadProps): JSX.Element => {
  const dispatch = useDispatch();
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const { imgUrl } = useSelector(
    (state: RootState) => ({
      imgUrl: state.admin.imgUrl,
    }),
    shallowEqual,
  );

  const handleClick = (): void => {
    imgUploadRef.current.click();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files[0]) {
      dispatch(setImageUrl(URL.createObjectURL(event.target.files[0])));
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
      <Img alt={'img'} src={imgUrl} />
      <Button onClick={handleClick}>썸네일 등록</Button>
    </Container>
  );
};

export default ImgUpload;
