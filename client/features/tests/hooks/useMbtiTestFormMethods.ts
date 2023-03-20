import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { mbtiTestResultFormSchema } from '../schemas/mbtiTestResultFormSchema';
import { mbtiTestSelectFormSchema } from '../schemas/mbtiTestSelectFormSchema';

export const useMbtiTestFormMethods = () => {
  const { mbtiTestResultFormItems, mbtiTestSelectFormItems } = useSelector(
    (state: RootState) => ({
      mbtiTestResultFormItems: state.mbtiTest.mbtiTestResultFormItems,
      mbtiTestSelectFormItems: state.mbtiTest.mbtiTestSelectFormItems,
    }),
    shallowEqual,
  );

  const mbtiTestResultFormMethods = useForm({
    resolver: yupResolver(mbtiTestResultFormSchema),
    defaultValues: { mbtiTestResultFormItems: [...mbtiTestResultFormItems] },
    mode: 'onChange',
  });

  const mbtiTestSelectFormMethods = useForm({
    resolver: yupResolver(mbtiTestSelectFormSchema),
    defaultValues: { mbtiTestSelectFormItems: [...mbtiTestSelectFormItems] },
    mode: 'onChange',
  });

  return {
    mbtiTestResultFormMethods,
    mbtiTestSelectFormMethods,
  };
};
