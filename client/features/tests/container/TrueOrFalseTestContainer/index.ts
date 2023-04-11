import dynamic from 'next/dynamic';

export const DynamicTureOrFalseTestSelectForm = dynamic(
  () => import('./TureOrFalseTestSelectForm'),
  {
    ssr: false,
  },
);

export const DynamicTrueOrFalseTestResultForm = dynamic(
  () => import('./TrueOrFalseTestResultForm'),
  {
    ssr: false,
  },
);

export const DynamicTrueOrFalseTestFinalForm = dynamic(
  () => import('./TrueOrFalseTestFinalForm'),
  {
    ssr: false,
  },
);
