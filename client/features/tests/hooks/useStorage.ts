import { useRouter } from 'next/router';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/modules';

const useStorage = () => {
  const { userId } = useSelector(
    (state: RootState) => ({
      userId: state.auth.userId,
    }),
    shallowEqual,
  );
  const router = useRouter();
  const getTestType = () => {
    const testType = router.query.test;
    if (typeof testType !== 'string') {
      return '';
    }
    return testType;
  };

  const getKey = () => {
    const testType = getTestType();
    return `${userId}${testType}`;
  };

  const setTestItems = (items) => {
    const testItems = getTestItems();
    const key = getKey();

    if (!key) {
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

  return { getKey, setTestItems, getTestItems, removeTestItems };
};

export default useStorage;
