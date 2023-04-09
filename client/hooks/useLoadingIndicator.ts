import { useEffect } from 'react';
import { Router } from 'next/router';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../store/modules';
import { setIsLoading } from '../store/modules/loading';
import { useDispatch } from 'react-redux';

const useLoadingIndicator = () => {
  const { isLoading } = useSelector(
    (state: RootState) => ({
      isLoading: state.loading.isLoading,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  const start = () => {
    dispatch(setIsLoading({ isLoading: true }));
  };

  const end = () => {
    dispatch(setIsLoading({ isLoading: false }));
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return isLoading;
};

export default useLoadingIndicator;
