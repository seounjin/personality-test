import React, { useRef } from 'react';
import PrivewImage from '../../../../components/PrivewImage/PrivewImage';
import {
  Container,
  Label,
  Input,
  CancleButton,
  RegisterButton,
  Text,
} from './ImageUpload.style';
import { useFormContext, useWatch } from 'react-hook-form';
import { IMAGE_HOLDER_PATH } from '../../tests.const';

interface ImageUploadProps {
  name: string;
  index?: number;
  onImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
    index?: number,
  ) => void;
  handleCancel: (name: string, index?: number, imgUrl?: string) => void;
}

const ImageUpload = ({
  name,
  onImageChange,
  handleCancel,
  index,
}: ImageUploadProps): JSX.Element => {
  const { control } = useFormContext();
  const imgUrl = useWatch({ control, name });

  const imgUploadRef = useRef<HTMLInputElement>(null);

  const handleRegister = (): void => {
    imgUploadRef.current.click();
  };
  return (
    <Container>
      <Label>썸네일 등록</Label>
      <Input
        type="file"
        ref={imgUploadRef}
        accept={'image/*'}
        onChange={(event) => onImageChange(event, name, index)}
      />
      <PrivewImage imgUrl={imgUrl} />
      <Text>이미지 미등록시 기본 이미지로 등록됩니다.</Text>

      <RegisterButton type="button" onClick={handleRegister}>
        이미지 등록
      </RegisterButton>
      {imgUrl !== IMAGE_HOLDER_PATH && (
        <CancleButton
          type="button"
          onClick={() => handleCancel(name, index, imgUrl)}
        >
          취소하기
        </CancleButton>
      )}
    </Container>
  );
};

export default ImageUpload;
