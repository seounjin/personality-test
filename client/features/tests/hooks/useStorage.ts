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

  const setTestItems = (items) => {
    const key = getKey();
    const testItems = getTestItems();
    if (!testItems) {
      localStorage.setItem(key, JSON.stringify(items));
    }
    localStorage.setItem(key, JSON.stringify({ ...testItems, ...items }));
  };

  const getTestItems = () => {
    const key = getKey();
    return JSON.parse(localStorage.getItem(key));
  };

  const removeTestItems = () => {
    const key = getKey();
    localStorage.removeItem(key);
  };

  return { setTestItems, getTestItems, removeTestItems };
};

export default useStorage;
