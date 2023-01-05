import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';
import { selectItemsFormSchema } from '../schemas/selectItemsFormSchema';
import { titleFormSchema } from '../schemas/titleFormSchema';
import { typeFormSchema } from '../schemas/typeFormSchema';

export const useFormMethods = () => {
  const { title, explain, typeFormItems, selectFormItems } = useSelector(
    (state: RootState) => ({
      title: state.admin.title,
      explain: state.admin.explain,
      typeFormItems: state.admin.typeFormItems,
      selectFormItems: state.admin.selectFormItems,
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
  });

  return {
    basicInformationFormMethods,
    typeFormMethods,
    selectFormItemsMethods,
  };
};
