import dynamic from 'next/dynamic';
import SkeletonBasicForm from '../../components/SkeletonBasicForm/SkeletonBasicForm';
import SkeletonResultForm from '../../components/SkeletonResultForm/SkeletonResultForm';
import SkeletonSelectForm from '../../components/SkeletonSelectForm/SkeletonSelectForm';

export const DynamicScoreTestResultForm = dynamic(
  () => import('./ScoreTestResultForm'),
  {
    ssr: false,
    loading: () => <SkeletonResultForm />,
  },
);

export const DynamicScoreTestSelectForm = dynamic(
  () => import('./ScoreTestSelectForm'),
  {
    ssr: false,
    loading: () => <SkeletonSelectForm />,
  },
);

export const DynamicScoreTestFinalForm = dynamic(
  () => import('./ScoreTestFinalForm'),
  {
    ssr: false,
    loading: () => <SkeletonBasicForm />,
  },
);
