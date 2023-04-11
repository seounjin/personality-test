import dynamic from 'next/dynamic';

export const DynamicMbtiTestResultForm = dynamic(
  () => import('./MbtiTestResultForm'),
  {
    ssr: false,
  },
);

export const DynamicMbtiTestSelectForm = dynamic(
  () => import('./MbtiTestSelectForm'),
  {
    ssr: false,
  },
);

export const DynamicMbtiTestFinalForm = dynamic(
  () => import('./MbtiTestFinalForm'),
  {
    ssr: false,
  },
);
