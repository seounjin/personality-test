import { useState } from 'react';
import Wrapper from './styles';
import ImageUploadContainer from '../../components/ImageUploadContainer';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import AdminButton from '../../components/AdminButton';
import UserContainer from '../../components/UserContainer';
import useAdmin from '../../hooks/useAdmin';
import fetcher from '../../api/fetcher';
import { fetchAdminData } from '../../store/modules/admin';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';

import {
  UserItem,
  Items,
  ResultContents,
} from '../../components/SelectContainer/type';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store';

interface AdminData {
  userItem: UserItem;
  items: Items[];
  resultContent: ResultContents[];
  imgUrl: string;
}

type AdminProps = {
  adminData: AdminData;
};

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
  //   userItem,
  //   resultContent,
  //   imgUrl,
  // } = useAdmin(adminData);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params.id;
    const cookie = context.req.headers.cookie ? context.req.headers.cookie : '';
    await store.dispatch(fetchAdminData({ cardId: id, cookie: cookie }));

    return {
      props: {}, // will be passed to the page component as props
    };
  },
);

// export const getServerSideProps = async (context) => {
//   const id = context.params.id;
//   const cookie = context.req.headers.cookie ? context.req.headers.cookie : '';

//   console.log('확인', context.store);
//   // context.store.dis
//   const res = await fetcher('get', `/tests/${id}/edit`, {
//     headers: {
//       Cookie: cookie,
//     },
//   });

//   if (res) {
//     const { userItem, items, resultContent, imgUrl, status } = res;

//     if (status) {
//       return {
//         props: {
//           error: { statusCode: res.status, message: 'Error!' },
//         },
//       };
//     }
//     return {
//       props: { adminData: { userItem, items, resultContent, imgUrl } },
//     };
//   } else {
//     return {
//       props: {
//         error: {
//           statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
//           message: 'Error!',
//         },
//       },
//     };

//   }
// };

export default Admin;
