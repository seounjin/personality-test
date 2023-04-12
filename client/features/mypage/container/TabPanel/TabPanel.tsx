import { useRouter, withRouter } from 'next/router';
import React, { lazy, Suspense, useEffect } from 'react';
import CardListSkeleton from '../../../../components/CardList/CardListSkeleton';
import SkeletonSignoutForm from '../../components/SkeletonSignoutForm/SkeletonSignoutForm';
import { CardItemsWrapper, SignoutFormWrapper } from './TabPanel.style';

const CardItems = lazy(() => import('../CardItems/CardItems'));
const SignoutContainer = lazy(
  () => import('../SignoutContainer/SignoutContainer'),
);

const TebPanel = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === '/mypage') {
      router.replace('/mypage?menu=my-personality', undefined, {
        shallow: true,
      });
    }
  }, []);

  const panelList = () => {
    const { menu } = router.query;
    switch (menu) {
      case 'my-personality':
        return (
          <CardItemsWrapper>
            <Suspense fallback={<CardListSkeleton CardListLength={3} />}>
              <CardItems />
            </Suspense>
          </CardItemsWrapper>
        );
      case 'signout':
        return (
          <SignoutFormWrapper>
            <Suspense fallback={<SkeletonSignoutForm />}>
              <SignoutContainer />
            </Suspense>
          </SignoutFormWrapper>
        );
    }
  };

  return <>{panelList()}</>;
};

export default withRouter(TebPanel);
