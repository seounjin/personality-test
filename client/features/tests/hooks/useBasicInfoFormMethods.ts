import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { titleFormSchema } from '../schemas/titleFormSchema';

export const useBasicInfoFormMethods = () => {
  const { title, subTitle, explain } = useSelector(
    (state: RootState) => ({
      title: state.tests.title,
      subTitle: state.tests.subTitle,
      explain: state.tests.explain,
    }),
    shallowEqual,
  );

  const basicInfoFormMethods = useForm({
    resolver: yupResolver(titleFormSchema),
    defaultValues: { title, explain, subTitle },
    mode: 'onChange',
  });

  return { basicInfoFormMethods };
};
