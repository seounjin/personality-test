import { useState, useEffect } from 'react';
import { reSetAdminData } from '../store/modules/admin';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../store/modules';

const useAdmin = () => {
  const [ImgFile, setImgFile] = useState<File>(null);
  const dispatch = useDispatch();

  const handleImgFile = (imgFile: File) => {
    setImgFile(imgFile);
  };

  const { isResultScreen } = useSelector(
    (state: RootState) => ({
      isResultScreen: state.admin.isResultScreen,
    }),
    shallowEqual,
  );

  useEffect(() => {
    return () => {
      dispatch(reSetAdminData());
    };
  }, []);

  return { ImgFile, isResultScreen, handleImgFile };
};

export default useAdmin;
