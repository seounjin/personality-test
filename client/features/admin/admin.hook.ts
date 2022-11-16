import { useState, useEffect } from 'react';
import { reSetAdminData } from '../../store/modules/admin';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

export const useAdmin = () => {
  const [imgFile, setImgFile] = useState<File>(null);
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

  return { imgFile, isResultScreen, handleImgFile };
};
