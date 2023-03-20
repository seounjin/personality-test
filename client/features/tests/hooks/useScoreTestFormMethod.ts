import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { scoreTestSelectFormSchema } from '../schemas/scoreTestSelectFormSchema';
import { scoreTestResultFormSchema } from '../schemas/scoreTestResultFormSchema';

export const useScoreTestFormMethod = () => {
  const { scoreTestResultFormItems, scoreTestSelectFormItems } = useSelector(
    (state: RootState) => ({
      scoreTestResultFormItems: state.scoreTest.scoreTestResultFormItems,
      scoreTestSelectFormItems: state.scoreTest.scoreTestSelectFormItems,
    }),
    shallowEqual,
  );

  const scoreTestResultFormMethods = useForm({
    resolver: yupResolver(scoreTestResultFormSchema),
    defaultValues: { scoreTestResultFormItems: [...scoreTestResultFormItems] },
    mode: 'onChange',
  });

  const scoreTestSelectFormMethods = useForm({
    resolver: yupResolver(scoreTestSelectFormSchema),
    defaultValues: { scoreTestSelectFormItems: [...scoreTestSelectFormItems] },
    mode: 'onChange',
  });

  return {
    scoreTestResultFormMethods,
    scoreTestSelectFormMethods,
  };
};
