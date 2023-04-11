import dynamic from 'next/dynamic';

export const DynamicScoreTestResultForm = dynamic(
  () => import('./ScoreTestResultForm'),
  {
    ssr: false,
  },
);

export const DynamicScoreTestSelectForm = dynamic(
  () => import('./ScoreTestSelectForm'),
  {
    ssr: false,
  },
);

export const DynamicScoreTestFinalForm = dynamic(
  () => import('./ScoreTestFinalForm'),
  {
    ssr: false,
  },
);
