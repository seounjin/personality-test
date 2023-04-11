import dynamic from 'next/dynamic';
import SkeletonBasicForm from '../../components/SkeletonBasicForm/SkeletonBasicForm';
import SkeletonResultForm from '../../components/SkeletonResultForm/SkeletonResultForm';
import SkeletonSelectForm from '../../components/SkeletonSelectForm/SkeletonSelectForm';

export const DynamicTureOrFalseTestSelectForm = dynamic(
  () => import('./TureOrFalseTestSelectForm'),
  {
    ssr: false,
    loading: () => <SkeletonSelectForm />,
  },
);

export const DynamicTrueOrFalseTestResultForm = dynamic(
  () => import('./TrueOrFalseTestResultForm'),
  {
    ssr: false,
    loading: () => <SkeletonResultForm />,
  },
);

export const DynamicTrueOrFalseTestFinalForm = dynamic(
  () => import('./TrueOrFalseTestFinalForm'),
  {
    ssr: false,
    loading: () => <SkeletonBasicForm />,
  },
);
