import dynamic from 'next/dynamic';
import SkeletonBasicForm from '../../components/SkeletonBasicForm/SkeletonBasicForm';
import SkeletonResultForm from '../../components/SkeletonResultForm/SkeletonResultForm';
import SkeletonSelectForm from '../../components/SkeletonSelectForm/SkeletonSelectForm';

export const DynamicMbtiTestResultForm = dynamic(
  () => import('./MbtiTestResultForm'),
  {
    ssr: false,
    loading: () => <SkeletonResultForm />,
  },
);

export const DynamicMbtiTestSelectForm = dynamic(
  () => import('./MbtiTestSelectForm'),
  {
    ssr: false,
    loading: () => <SkeletonSelectForm />,
  },
);

export const DynamicMbtiTestFinalForm = dynamic(
  () => import('./MbtiTestFinalForm'),
  {
    ssr: false,
    loading: () => <SkeletonBasicForm />,
  },
);
