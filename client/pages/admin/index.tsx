import { useCallback, useState } from 'react';
import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import AdminButton from '../../components/AdminButton';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

const Admin = (): JSX.Element => {
  // const {
  //   handleOk,
  //   handleDelete,
  //   handleAdd,
  //   onChange,
  //   handleApprove,
  //   handleTextArea,
  //   handleCreate,
  //   handleUser,
  //   handleImgUpload,
  //   handleExcute,
  //   items,
  //   isVisible,
  //   isResultScreen,
  //   resultItems,
  // } = useAdmin();

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
          {/* <UserContainer handleUser={handleUser}></UserContainer> */}
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
          {/* {items.map((data, index) => (
            <SelectContainer
              key={'select' + index}
              handleOk={handleOk}
              handleDelete={handleDelete}
              onChange={onChange}
              index={index}
              data={data}
              isVisible={isVisible[index]}
              isResultScreen={isResultScreen}
            ></SelectContainer>
          ))} */}
          {/* {isResultScreen === false && (
            <AdminButton
              leftButton={handleAdd}
              rightButton={handleApprove}
              leftName={'추가'}
              rightName={'완료'}
            />
          )} */}
        </div>

        {/* {isResultScreen && (
          <div className="admin_content">
            <h2>결과 작성</h2>
            <ResultContainer
              handleTextArea={handleTextArea}
              resultItems={resultItems}
            ></ResultContainer>
            <AdminButton
              leftButton={handleExcute}
              rightButton={handleCreate}
              leftName={'취소'}
              rightName={'생성'}
            />
          </div>
        )} */}

        {isResultScreen && (
          <div className="admin_content">
            <h2>결과 작성</h2>
            <ResultContainer ImgFile={ImgFile}></ResultContainer>
            {/* <AdminButton
              leftButton={handleExcute}
              rightButton={handleCreate}
              leftName={'취소'}
              rightName={'생성'}
            /> */}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Admin;
