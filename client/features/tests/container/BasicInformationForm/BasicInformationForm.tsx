import React, { useState } from 'react';
import { Form, TextFiledArea } from './BasicInformationForm.style';
import TextFiled from '../../../../components/TextFiled/TextField';
import { useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useStorage from '../../hooks/useStorage';
import { RootState } from '../../../../store/modules';
import {
  setBasicInformationForm,
  setThumbnailImageBase64Data,
} from './BasicInformationForm.slice';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import {
  actionImageCompress,
  isImageFile,
  isValidImageUrl,
  parseS3Url,
} from '../../tests.util';
import { IMAGE_HOLDER_PATH, MAX_FILE_SIZE } from '../../tests.const';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../../components/Modal/Modal';
import DeleteAlertModal from '../../../../components/DeleteAlertModal/DeleteAlertModal';
import { useFetcher } from '../../../../hooks/useFetcher';
import { useRouter } from 'next/router';

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

  const router = useRouter();
  const fetcher = useFetcher();
  const [validImageUrl, setValidImageUrl] = useState<string>('');
  const { isModalOpen, openModal, closeModal } = useModal();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { title, subTitle, explain, thumbnailImgUrl } = data;

    if (mode === 'create') {
      setTestItems({
        basicInformationItems: { title, subTitle, explain },
        thumbnailImgUrl,
      });
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

  const handleCancel = (name: string, index = 0, imgUrl: string) => {
    if (isValidImageUrl(imgUrl)) {
      setValidImageUrl(imgUrl);
      openModal();
      return;
    }

    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setThumbnailImageBase64Data({ thumbnailImageBase64Data: '' }));
  };

  const handleClose = () => {
    closeModal();
  };

  const requestDelete = async () => {
    const { bucketName, imagePath } = parseS3Url(validImageUrl);
    const id = router.query.slug[0];
    const res = await fetcher(
      'delete',
      `/personality/${id}/thumbnail?bucketName=${bucketName}&imagePath=${imagePath}`,
    );

    closeModal();
    if (res.success) {
      alert('이미지가 삭제 되었습니다.');
      setValue('thumbnailImgUrl', IMAGE_HOLDER_PATH);
    } else {
      alert('죄송합니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Form id="basicInformationForm" onSubmit={handleSubmit(onSubmit)}>
        <TextFiledArea>
          <TextFiled label={'제 목'} name={'title'} />
          <TextFiled label={'부제목'} name={'subTitle'} />
          <TextFiled label={'설 명'} name={'explain'} />
        </TextFiledArea>
        <ImageUpload
          name={`thumbnailImgUrl`}
          onImageChange={onImageChange}
          handleCancel={handleCancel}
        />
      </Form>
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <DeleteAlertModal
            handleConfirm={requestDelete}
            handleClose={handleClose}
            textA={
              '삭제하시면 해당 이미지는 복구 할 수 없습니다. 삭제하시겠습니까?'
            }
          />
        </Modal>
      )}
    </>
  );
};

export default BasicInformationForm;
