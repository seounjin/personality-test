import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';

const Admin = (): JSX.Element => {
  const { ImgFile, isResultScreen, handleImgFile } = useAdmin();

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
