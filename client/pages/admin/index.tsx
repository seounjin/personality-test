import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import AdminButton from '../../components/AdminButton';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';

const Admin = (): JSX.Element => {
  const {
    handleOk,
    handleDelete,
    handleAdd,
    onChange,
    handleApprove,
    handleTextArea,
    handleCreate,
    handleUser,
    handleImgUpload,
    handleExcute,
    items,
    isVisible,
    isResultScreen,
    resultItems,
  } = useAdmin();

  return (
    <Wrapper>
      <div className="admin_wrapper">
        <div className="admin_title">
          <h1>만들어 보아요</h1>
        </div>

        <div className="admin_content">
          <h1>유저 등록</h1>
          <UserContainer handleUser={handleUser}></UserContainer>
        </div>

        <div className="admin_content">
          <h1>이미지 등록</h1>
          <ImageUploadContainer
            handleImgUpload={handleImgUpload}
          ></ImageUploadContainer>
        </div>

        <div className="admin_content">
          <h1>선택지 작성</h1>
          {items.map((data, index) => (
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
          ))}
          {isResultScreen === false && (
            <AdminButton
              leftButton={handleAdd}
              rightButton={handleApprove}
              leftName={'추가'}
              rightName={'완료'}
            />
          )}
        </div>

        {isResultScreen && (
          <div className="admin_content">
            <h1>결과 작성</h1>
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
        )}
      </div>
    </Wrapper>
  );
};

export default Admin;
