import dynamic from 'next/dynamic';

export const DynamicBasicInformationForm = dynamic(
  () => import('./BasicInformationForm'),
  {
    ssr: false,
  },
);
