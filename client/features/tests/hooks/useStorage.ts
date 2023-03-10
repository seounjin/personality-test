import { useRouter } from 'next/router';

const useStorage = () => {
  const router = useRouter();
  const getKey = () => {
    const key = router.query.test;
    if (typeof key !== 'string') {
      return '';
    }
    return key;
  };

  const setTestsItems = (items) => {
    const key = getKey();
    const testsItems = getTestsItems();
    if (!testsItems) {
      localStorage.setItem(key, JSON.stringify(items));
    }
    localStorage.setItem(key, JSON.stringify({ ...testsItems, ...items }));
  };

  const getTestsItems = () => {
    const key = getKey();
    return JSON.parse(localStorage.getItem(key));
  };

  return { setTestsItems, getTestsItems };
};

export default useStorage;
