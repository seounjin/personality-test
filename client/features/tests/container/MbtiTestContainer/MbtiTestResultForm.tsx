import { useRouter } from 'next/router';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import DeleteAlertModal from '../../../../components/DeleteAlertModal/DeleteAlertModal';
import Modal from '../../../../components/Modal/Modal';
import { useFetcher } from '../../../../hooks/useFetcher';
import useModal from '../../../../hooks/useModal';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultFormBox from '../../components/ResultFormBox/ResultFormBox';
import useImageValidationState from '../../hooks/useImageValidationState';
import useStorage from '../../hooks/useStorage';
import { IMAGE_HOLDER_PATH, MAX_FILE_SIZE } from '../../tests.const';
import { MbtiTestResultImageUrl, ResultFormItem } from '../../tests.types';
import {
  isImageFile,
  actionImageCompress,
  isValidImageUrl,
  parseS3Url,
  validateImageFile,
} from '../../tests.util';
import { MBTI_TEST_RESULT_FORM_ID } from './mbtiTest.const';
import {
  setImageBase64DataArray,
  setInitMbtiSelctFormItems,
  setmbtiTestResultFormItems,
} from './mbtiTest.slice';
import MbtiTestResultWriter from './MbtiTestResultWriter';

type mbtiTestResultFormItemsValues = {
  mbtiTestResultFormItems: ResultFormItem[];
};

interface MbtiTestResultFormProps {
  handleNext: () => void;
}

const MbtiTestResultForm = ({
  handleNext,
}: MbtiTestResultFormProps): JSX.Element => {
  const { control, trigger, handleSubmit, setValue } =
    useFormContext<mbtiTestResultFormItemsValues>();
  const { fields } = useFieldArray({
    control,
    name: 'mbtiTestResultFormItems',
  });

  const router = useRouter();
  const fetcher = useFetcher();
  const { setTestItems } = useStorage();
  const dispatch = useDispatch();

  const {
    validImageUrl,
    validImageName,
    validImageIndex,
    setImageValidationState,
  } = useImageValidationState();
  const { isModalOpen, openModal, closeModal } = useModal();

  const { mode } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
    }),
    shallowEqual,
  );

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { mbtiTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({ resultItems: mbtiTestResultFormItems });
    }

    dispatch(
      setmbtiTestResultFormItems({
        mbtiTestResultFormItems: [...mbtiTestResultFormItems],
      }),
    );
    dispatch(setInitMbtiSelctFormItems());

    handleNext();
  };

  const onImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: MbtiTestResultImageUrl,
    index: number,
  ) => {
    const file = event.target.files[0];

    if (!validateImageFile(file)) {
      return;
    }

    try {
      const { compressedFile, imageBase64Data } = await actionImageCompress(
        file,
      );
      dispatch(setImageBase64DataArray({ index, imageBase64Data }));
      setValue(name, URL.createObjectURL(compressedFile));
    } catch (error) {
      alert('잠시 후 다시 시도해주세요');
    }
  };

  const handleCancel = (
    name: MbtiTestResultImageUrl,
    index: number,
    imgUrl: string,
  ) => {
    if (isValidImageUrl(imgUrl)) {
      setImageValidationState(imgUrl, name, index);
      openModal();
      return;
    }
    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setImageBase64DataArray({ index, imageBase64Data: '' }));
  };

  const requestDelete = async () => {
    const { bucketName, imagePath } = parseS3Url(validImageUrl);
    const id = router.query.slug[0];
    const res = await fetcher(
      'delete',
      `/personality/${id}/mbti-result-image?bucketName=${bucketName}&imagePath=${imagePath}&index=${validImageIndex}`,
    );

    closeModal();
    if (res.success) {
      alert('이미지가 삭제 되었습니다.');
      setValue(validImageName as MbtiTestResultImageUrl, IMAGE_HOLDER_PATH);
    } else {
      alert('죄송합니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <FormLayout id={MBTI_TEST_RESULT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id }, index) => (
        <ResultFormBox key={id} numberling={`${index + 1}번`}>
          <ImageUpload
            name={`mbtiTestResultFormItems[${index}].resultImageUrl`}
            onImageChange={onImageChange}
            handleCancel={handleCancel}
            index={index}
          />
          <MbtiTestResultWriter
            key={id}
            index={index}
            firstLabel={'Mbti 유형'}
            firstInputDisalbed={true}
            secondLabel={'결 과'}
            thirdLabel={'설 명'}
            name={'mbtiTestResultFormItems'}
          />
        </ResultFormBox>
      ))}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <DeleteAlertModal
            handleConfirm={requestDelete}
            handleClose={closeModal}
            textA={
              '삭제하시면 해당 이미지는 복구 할 수 없습니다. 삭제하시겠습니까?'
            }
          />
        </Modal>
      )}
    </FormLayout>
  );
};

export default MbtiTestResultForm;
