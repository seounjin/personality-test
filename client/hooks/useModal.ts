import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
    router.push(router.asPath, undefined, { shallow: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        if (isModalOpen) {
          window.history.pushState('', '');
          router.replace(router.asPath);
          closeModal();
          return false;
        }
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router, isModalOpen]);

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
