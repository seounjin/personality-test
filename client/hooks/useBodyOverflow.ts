import { useEffect } from 'react';

const useBodyOverflow = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
};

export default useBodyOverflow;
