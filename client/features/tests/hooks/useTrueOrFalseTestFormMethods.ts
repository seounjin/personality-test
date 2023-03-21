import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { trueOrFalseTestResultFormSchema } from '../schemas/trueOrFalseTestResultFormSchema';
import { trueOrFalseTestSelectItemsFormSchema } from '../schemas/trueOrFalseTestSelectItemsFormSchema';

export const useTrueOrFalseTestFormMethods = () => {
  const { trueOrFalseTestSelectFormItems, trueOrFalseTestResultFormItems } =
    useSelector(
      (state: RootState) => ({
        trueOrFalseTestSelectFormItems:
          state.trueOrFalseTest.trueOrFalseTestSelectFormItems,
        trueOrFalseTestResultFormItems:
          state.trueOrFalseTest.trueOrFalseTestResultFormItems,
      }),
      shallowEqual,
    );

  const trueOrFalseTestSelectFormMethods = useForm({
    resolver: yupResolver(trueOrFalseTestSelectItemsFormSchema),
    defaultValues: {
      trueOrFalseTestSelectFormItems: [...trueOrFalseTestSelectFormItems],
    },
    mode: 'onChange',
  });

  const trueOrFalseTestResultFormMethods = useForm({
    resolver: yupResolver(trueOrFalseTestResultFormSchema),
    defaultValues: {
      trueOrFalseTestResultFormItems: [...trueOrFalseTestResultFormItems],
    },
    mode: 'onChange',
  });

  return { trueOrFalseTestSelectFormMethods, trueOrFalseTestResultFormMethods };
};
