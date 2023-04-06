import React, { useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { useDispatch } from 'react-redux';
import {
  Container,
  Input,
  Button,
  Label,
  Text,
  CancleButton,
} from './ThumbnailImageUpload.style';

import PrivewImage from '../../components/PrivewImage/PrivewImage';
import imageCompression from 'browser-image-compression';
import { MAX_FILE_SIZE } from '../../tests.const';
import {
  setImageInformation,
  setResetChangeImage,
} from '../BasicInformationForm/BasicInformationForm.slice';

const ThumbnailImageUpload = (): JSX.Element => {
  const dispatch = useDispatch();
  const imgUploadRef = useRef<HTMLInputElement>(null);

  const { thumbnailImgUrl, isOpenCancleButton } = useSelector(
    (state: RootState) => ({
      thumbnailImgUrl: state.basicForm.thumbnailImgUrl,
      isOpenCancleButton: state.basicForm.isOpenCancleButton,
    }),
    shallowEqual,
  );

  const handleRegister = (): void => {
    imgUploadRef.current.click();
  };

  const actionImageCompress = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const imageData = reader.result;
        dispatch(
          setImageInformation({
            thumbnailImgUrl: URL.createObjectURL(compressedFile),
            imageData: imageData,
          }),
        );
      };
    } catch (error) {
      alert('잠시 후 다시 시도해주세요');
    }
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      alert('최대 이미지 용량은 2mb입니다.');
      return;
    }

    if (file) {
      actionImageCompress(file);
    }
  };

  const handleCancel = () => {
    dispatch(setResetChangeImage());
  };

  return (
    <Container>
      <Label>썸네일 등록</Label>
      <Input
        type="file"
        ref={imgUploadRef}
        accept={'image/*'}
        onChange={onImageChange}
      />
      <PrivewImage imgUrl={thumbnailImgUrl} />
      <Text>썸네일 이미지 미등록시 기본 이미지로 등록됩니다.</Text>

      <Button type="button" onClick={handleRegister}>
        썸네일 등록
      </Button>
      {isOpenCancleButton && (
        <CancleButton type="button" onClick={handleCancel}>
          취소하기
        </CancleButton>
      )}
    </Container>
  );
};
export default ThumbnailImageUpload;
