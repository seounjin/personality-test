import { useState } from 'react';
import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import UserContainer from '../../components/UserContainer';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

const Admin = (): JSX.Element => {
  const [ImgFile, setImgFile] = useState<File>(null);

  const handleImgFile = (imgFile: File) => {
    console.log('imgFile', imgFile);
    setImgFile(imgFile);
  };

  const { isResultScreen } = useSelector(
    (state: RootState) => ({
      isResultScreen: state.admin.isResultScreen,
    }),
    shallowEqual,
  );

  return (
    <Wrapper>
      <div className="admin_wrapper">
        <div className="admin_title">
          <h1>만들어 보아요</h1>
        </div>

        <div className="admin_content">
          <h2>유저 등록</h2>
          <UserContainer></UserContainer>
        </div>

        <div className="admin_content">
          <h2>이미지 등록</h2>
          <ImageUploadContainer
            handleImgFile={handleImgFile}
          ></ImageUploadContainer>
        </div>

        <div className="admin_content">
          <h2>선택지 작성</h2>
          <SelectContainer></SelectContainer>
        </div>

        {isResultScreen && (
          <div className="admin_content">
            <h2>결과 작성</h2>
            <ResultContainer ImgFile={ImgFile}></ResultContainer>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Admin;
