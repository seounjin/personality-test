import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import SignoutForm from '../../components/SignoutForm/SignoutForm';
import CardItems from '../CardItems/CardItems';
import { Container } from './TabPanel.style';

const TebPanel = (): JSX.Element => {
  const { currentPanel } = useSelector(
    (state: RootState) => ({
      currentPanel: state.mypage.currentPanel,
    }),
    shallowEqual,
  );

  const panelList = (currentPanel) => {
    switch (currentPanel) {
      case 0:
        return <CardItems />;
      case 1:
        return <SignoutForm />;
    }
  };

  return <Container>{panelList(currentPanel)}</Container>;
};

export default TebPanel;
