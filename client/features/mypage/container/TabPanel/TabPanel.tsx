import { useRouter, withRouter } from 'next/router';
import React, { useEffect } from 'react';
import CardItems from '../CardItems/CardItems';
import SignoutContainer from '../SignoutContainer/SignoutContainer';
import { Container } from './TabPanel.style';

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
        return <CardItems />;
      case 'signout':
        return <SignoutContainer />;
    }
  };

  return <Container>{panelList()}</Container>;
};

export default withRouter(TebPanel);
