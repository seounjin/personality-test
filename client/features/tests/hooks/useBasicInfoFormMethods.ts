import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { basicInfoFormSchema } from '../schemas/basicInfoFormSchema';

export const useBasicInfoFormMethods = () => {
  const { title, subTitle, explain, thumbnailImgUrl } = useSelector(
    (state: RootState) => ({
      title: state.basicForm.title,
      subTitle: state.basicForm.subTitle,
      explain: state.basicForm.explain,
      thumbnailImgUrl: state.basicForm.thumbnailImgUrl,
    }),
    shallowEqual,
  );

  const basicInfoFormMethods = useForm({
    resolver: yupResolver(basicInfoFormSchema),
    defaultValues: { title, explain, subTitle, thumbnailImgUrl },
    mode: 'onChange',
  });

  return { basicInfoFormMethods };
};
