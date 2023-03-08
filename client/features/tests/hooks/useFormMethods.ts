import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { mbtiSelectItemsFormSchema } from '../schemas/mbtiSelectItemsFormSchema';
import { mbtiTypeFormSchema } from '../schemas/mbtiTypeFormSchema';
import { selectItemsFormSchema } from '../schemas/selectItemsFormSchema';
import { titleFormSchema } from '../schemas/titleFormSchema';
import { typeFormSchema } from '../schemas/typeFormSchema';

export const useFormMethods = () => {
  const {
    title,
    explain,
    typeFormItems,
    selectFormItems,
    mbtiTypeFormItems,
    mbtiSelectFormItems,
  } = useSelector(
    (state: RootState) => ({
      title: state.tests.title,
      explain: state.tests.explain,
      typeFormItems: state.tests.typeFormItems,
      selectFormItems: state.tests.selectFormItems,
      mbtiTypeFormItems: state.tests.mbtiTypeFormItems,
      mbtiSelectFormItems: state.tests.mbtiSelectFormItems,
    }),
    shallowEqual,
  );

  const basicInformationFormMethods = useForm({
    resolver: yupResolver(titleFormSchema),
    defaultValues: { title, explain },
    mode: 'onChange',
  });

  const typeFormMethods = useForm({
    resolver: yupResolver(typeFormSchema),
    defaultValues: { typeFormItems: [...typeFormItems] },
    mode: 'onChange',
  });

  const selectFormItemsMethods = useForm({
    resolver: yupResolver(selectItemsFormSchema),
    defaultValues: { selectFormItems: [...selectFormItems] },
    mode: 'onChange',
  });

  const mbtiTypeFormMethods = useForm({
    resolver: yupResolver(mbtiTypeFormSchema),
    defaultValues: { mbtiTypeFormItems: [...mbtiTypeFormItems] },
    mode: 'onChange',
  });

  const mbtiSelectFormItemsMethods = useForm({
    resolver: yupResolver(mbtiSelectItemsFormSchema),
    defaultValues: { mbtiSelectFormItems: [...mbtiSelectFormItems] },
    mode: 'onChange',
  });

  return {
    basicInformationFormMethods,
    typeFormMethods,
    selectFormItemsMethods,
    mbtiTypeFormMethods,
    mbtiSelectFormItemsMethods,
  };
};
