import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { selectItemsFormSchema } from '../schemas/selectItemsFormSchema';
import { titleFormSchema } from '../schemas/titleFormSchema';
import { trueOrFalseResultFormSchema } from '../schemas/trueOrFalseResultFormSchema';
import { trueOrFalseSelectItemsFormSchema } from '../schemas/trueOrFalseSelectItemsFormSchema';
import { scoreTestResultFormSchema } from '../schemas/scoreTestResultFormSchema';
import { mbtiTestResultFormSchema } from '../schemas/mbtiTestResultFormSchema';
import { mbtiTestSelectFormSchema } from '../schemas/mbtiTestSelectFormSchema';

export const useFormMethods = () => {
  const {
    title,
    subTitle,
    explain,
    typeFormItems,
    selectFormItems,
    mbtiTypeFormItems,
    mbtiSelectFormItems,
    trueOrFalseSelectFormItems,
    trueOrFalseResultFormItems,
  } = useSelector(
    (state: RootState) => ({
      title: state.tests.title,
      subTitle: state.tests.subTitle,
      explain: state.tests.explain,
      typeFormItems: state.tests.typeFormItems,
      selectFormItems: state.tests.selectFormItems,
      mbtiTypeFormItems: state.tests.mbtiTypeFormItems,
      mbtiSelectFormItems: state.tests.mbtiSelectFormItems,
      trueOrFalseSelectFormItems: state.tests.trueOrFalseSelectFormItems,
      trueOrFalseResultFormItems: state.tests.trueOrFalseResultFormItems,
    }),
    shallowEqual,
  );

  const basicInformationFormMethods = useForm({
    resolver: yupResolver(titleFormSchema),
    defaultValues: { title, explain, subTitle },
    mode: 'onChange',
  });

  const typeFormMethods = useForm({
    resolver: yupResolver(scoreTestResultFormSchema),
    defaultValues: { typeFormItems: [...typeFormItems] },
    mode: 'onChange',
  });

  const selectFormItemsMethods = useForm({
    resolver: yupResolver(selectItemsFormSchema),
    defaultValues: { selectFormItems: [...selectFormItems] },
    mode: 'onChange',
  });

  const mbtiTypeFormMethods = useForm({
    resolver: yupResolver(mbtiTestResultFormSchema),
    defaultValues: { mbtiTypeFormItems: [...mbtiTypeFormItems] },
    mode: 'onChange',
  });

  const mbtiSelectFormItemsMethods = useForm({
    resolver: yupResolver(mbtiTestSelectFormSchema),
    defaultValues: { mbtiSelectFormItems: [...mbtiSelectFormItems] },
    mode: 'onChange',
  });

  const trueOrFalseSelectFormItemsMethods = useForm({
    resolver: yupResolver(trueOrFalseSelectItemsFormSchema),
    defaultValues: {
      trueOrFalseSelectFormItems: [...trueOrFalseSelectFormItems],
    },
    mode: 'onChange',
  });

  const trueOrFalseResultFormItemsMethods = useForm({
    resolver: yupResolver(trueOrFalseResultFormSchema),
    defaultValues: {
      trueOrFalseResultFormItems: [...trueOrFalseResultFormItems],
    },
    mode: 'onChange',
  });

  return {
    basicInformationFormMethods,
    typeFormMethods,
    selectFormItemsMethods,
    mbtiTypeFormMethods,
    mbtiSelectFormItemsMethods,
    trueOrFalseSelectFormItemsMethods,
    trueOrFalseResultFormItemsMethods,
  };
};
