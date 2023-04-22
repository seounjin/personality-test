import React from 'react';
import { Form, TextFiledArea } from './BasicInformationForm.style';
import TextFiled from '../../../../components/TextFiled/TextField';
import { useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useStorage from '../../hooks/useStorage';
import { RootState } from '../../../../store/modules';
import ThumbnailImageUpload from '../ThumbnailImageUpload/ThumbnailImageUpload';
import {
  setBasicInformationForm,
  setThumbnailImageBase64Data,
} from './BasicInformationForm.slice';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { actionImageCompress, isImageFile } from '../../tests.util';
import { IMAGE_HOLDER_PATH, MAX_FILE_SIZE } from '../../tests.const';

interface BasicInformationFormProps {
  handleNext: () => void;
}

const BasicInformationForm = ({
  handleNext,
}: BasicInformationFormProps): JSX.Element => {
  const { handleSubmit, trigger, setValue } = useFormContext();
  const dispatch = useDispatch();
  const { setTestItems } = useStorage();
  const { mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
    }),
    shallowEqual,
  );
  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { title, subTitle, explain, thumbnailImgUrl } = data;

    if (mode === 'create') {
      setTestItems({ basicInformationItems: data });
    }

    dispatch(
      setBasicInformationForm({
        title: title,
        subTitle: subTitle,
        explain: explain,
        thumbnailImgUrl: thumbnailImgUrl,
      }),
    );
    handleNext();
  };

  const onImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!isImageFile(file.name)) {
      alert('허용되지 않은 파일 형식입니다.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('최대 이미지 용량은 2mb입니다.');
      return;
    }

    try {
      const { compressedFile, imageBase64Data } = await actionImageCompress(
        file,
      );
      dispatch(
        setThumbnailImageBase64Data({
          thumbnailImageBase64Data: imageBase64Data,
        }),
      );
      setValue(name, URL.createObjectURL(compressedFile));
    } catch (error) {
      alert('잠시 후 다시 시도해주세요');
    }
  };

  const handleCancel = (name: string) => {
    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setThumbnailImageBase64Data({ thumbnailImageBase64Data: '' }));
  };

  return (
    <Form id="basicInformationForm" onSubmit={handleSubmit(onSubmit)}>
      <TextFiledArea>
        <TextFiled label={'제 목'} name={'title'} />
        <TextFiled label={'부제목'} name={'subTitle'} />
        <TextFiled label={'설 명'} name={'explain'} />
      </TextFiledArea>
      {/* <ThumbnailImageUpload /> */}
      <ImageUpload
        name={`thumbnailImgUrl`}
        onImageChange={onImageChange}
        handleCancel={handleCancel}
      />
    </Form>
  );
};

export default BasicInformationForm;
