import dynamic from 'next/dynamic';
import SkeletonBasicForm from '../../components/SkeletonBasicForm/SkeletonBasicForm';

export const DynamicBasicInformationForm = dynamic(
  () => import('./BasicInformationForm'),
  {
    ssr: false,
    loading: () => <SkeletonBasicForm />,
  },
);
