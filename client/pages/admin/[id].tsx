import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import AdminButton from '../../components/AdminButton';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';
import fetcher from '../../api/fetcher';
import {
  UserItem,
  Items,
  ResultContents,
} from '../../components/SelectContainer/type';
import { GetServerSideProps } from 'next';
import Error from 'next/error';

interface AdminData {
  userItem: UserItem;
  items: Items[];
  resultContent: ResultContents[];
  imgUrl: string;
}

type AdminProps = {
  adminData: AdminData;
};

const Admin = ({ adminData }: AdminProps): JSX.Element => {
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
        <div className="admin_title">
          <h1>만들어 보아요</h1>
        </div>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  const cookie = context.req.headers.cookie ? context.req.headers.cookie : '';

  const res = await fetcher('get', `/tests/${id}/edit`, {
    headers: {
      Cookie: cookie,
    },
  });

  if (res) {
    const { userItem, items, resultContent, imgUrl, status } = res;

    if (status) {
      return {
        props: {
          error: { statusCode: res.status, message: 'Error!' },
        },
      };
    }
    return {
      props: { adminData: { userItem, items, resultContent, imgUrl } },
    };
  } else {
    return {
      props: {
        error: {
          statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
          message: 'Error!',
        },
      },
    };
  }
};

export default Admin;
