import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import AdminButton from '../../components/AdminButton';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';
import fetcher from '../../api/fetcher';
import { GetStaticProps, GetStaticPaths } from 'next';

const Admin = ({ adminData }): JSX.Element => {
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
    userItem,
    resultContent,
    imgUrl,
  } = useAdmin(adminData);

  return (
    <Wrapper>
      <div className="admin_wrapper">
        <h1>만들어 보아요</h1>

        <div className="admin_content">
          <h1>유저 등록</h1>
          <UserContainer
            userItem={userItem}
            handleUser={handleUser}
          ></UserContainer>
        </div>

        <div className="admin_content">
          <h1>이미지 등록</h1>
          <ImageUploadContainer
            imgUrl={imgUrl}
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
              resultContents={resultContent}
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

export const getStaticPaths: GetStaticPaths = async () => {
  // 서버에 요청하는 것으로 바꿔야함
  const paths = Array(100)
    .fill(0)
    .map((_, index) => ({
      params: { id: `${index + 1}` },
    }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params: { id } }) => {
  const res = await fetcher('get', `/tests/${id}/edit`);
  const { userItem, items, resultContent, imgUrl } = res;

  return {
    props: { adminData: { userItem, items, resultContent, imgUrl } },
  };
};

export default Admin;
