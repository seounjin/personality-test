import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import { TF_TEST_RESULT_FORM_ID } from './trueOrFalse.const';
import {
  setImageBase64DataArray,
  setInitImageBase64DataArray,
  setTrueOrFalseTestResultFormItems,
} from './trueOrFalse.slice';
import { TrueOrFalseTestResultFormValues } from './trueOrFalseTest.type';
import useStorage from '../../hooks/useStorage';
import { createTrueOrFalseTestResultFormItems } from './trueOrFalse.utils';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultFormBox from '../../components/ResultFormBox/ResultFormBox';
import ResultWriter from '../../components/ResultWriter/ResultWriter';
import SelectedOptionsTable from '../../components/SelectedOptionsTable/SelectedOptionsTable';
import {
  validateImageFile,
  actionImageCompress,
  isValidImageUrl,
  parseS3Url,
} from '../../tests.util';
import { TrueOrFalseTestResultImageUrl } from '../../tests.types';
import { useRouter } from 'next/router';
import { useFetcher } from '../../../../hooks/useFetcher';
import useModal from '../../../../hooks/useModal';
import useImageValidationState from '../../hooks/useImageValidationState';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import DeleteAlertModal from '../../../../components/DeleteAlertModal/DeleteAlertModal';
import Modal from '../../../../components/Modal/Modal';

interface TrueOrFalseResultFormProps {
  handleNext: () => void;
}

const TrueOrFalseTestResultForm = ({
  handleNext,
}: TrueOrFalseResultFormProps): JSX.Element => {
  const { control, trigger, handleSubmit, setValue } =
    useFormContext<TrueOrFalseTestResultFormValues>();
  const { fields } = useFieldArray({
    control,
    name: 'trueOrFalseTestResultFormItems',
  });
  const router = useRouter();
  const fetcher = useFetcher();
  const {
    validImageUrl,
    validImageName,
    validImageIndex,
    setImageValidationState,
  } = useImageValidationState();

  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const { mode, trueOrFalseTestSelectFormItems } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      trueOrFalseTestSelectFormItems:
        state.trueOrFalseTest.trueOrFalseTestSelectFormItems,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const res = createTrueOrFalseTestResultFormItems(
      trueOrFalseTestSelectFormItems,
      fields.length ? fields : [],
    );

    setValue('trueOrFalseTestResultFormItems', res);
    dispatch(setInitImageBase64DataArray({ arrayLength: res.length }));
  }, []);

  const { setTestItems } = useStorage();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;

    const { trueOrFalseTestResultFormItems } = data;

    if (mode === 'create') {
      setTestItems({
        resultItems: trueOrFalseTestResultFormItems,
      });
    }

    dispatch(setTrueOrFalseTestResultFormItems(data));

    handleNext();
  };

  const onImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: TrueOrFalseTestResultImageUrl,
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
    name: TrueOrFalseTestResultImageUrl,
    index: number,
    imgUrl: string,
  ) => {
    if (isValidImageUrl(imgUrl)) {
      setImageValidationState(
        imgUrl,
        name as TrueOrFalseTestResultImageUrl,
        index,
      );
      openModal();
      return;
    }
    setValue(name, IMAGE_HOLDER_PATH);
    dispatch(setImageBase64DataArray({ index, imageBase64Data: '' }));
  };

  const handleClose = () => {
    closeModal();
  };

  const requestDelete = async () => {
    const { bucketName, imagePath } = parseS3Url(validImageUrl);
    const id = router.query.slug[0];
    const res = await fetcher(
      'delete',
      `/personality/${id}/true-or-false-result-image?bucketName=${bucketName}&imagePath=${imagePath}&index=${validImageIndex}`,
    );

    closeModal();
    if (res.success) {
      alert('이미지가 삭제 되었습니다.');
      setValue(
        validImageName as TrueOrFalseTestResultImageUrl,
        IMAGE_HOLDER_PATH,
      );
    } else {
      alert('죄송합니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <FormLayout id={TF_TEST_RESULT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map(
          (
            { id, resultContent, explanationContent, selectedOption },
            index,
          ) => (
            <ResultFormBox key={id} numberling={`${index + 1}번`}>
              <ImageUpload
                name={`trueOrFalseTestResultFormItems[${index}].resultImageUrl`}
                onImageChange={onImageChange}
                handleCancel={handleCancel}
                index={index}
              />
              <SelectedOptionsTable selectedOption={selectedOption} />
              <ResultWriter
                index={index}
                firstLabel={'유 형'}
                firstContent={resultContent}
                secondLabel={'설 명'}
                secondContent={explanationContent}
                name={'trueOrFalseTestResultFormItems'}
              />
            </ResultFormBox>
          ),
        )}
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
    </FormLayout>
  );
};

export default TrueOrFalseTestResultForm;
