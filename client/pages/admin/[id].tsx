import styled from 'styled-components';
import ImageUpload from '../../features/admin/container/ImageUpload/ImageUpload';
import ResultCard from '../../features/admin/container/ResultCard/ResultCard';
import UserForm from '../../features/admin/components/UserForm/UserForm';
import SelectCard from '../../features/admin/container/SelectCard/SelectCard';
import { fetchAdminData } from '../../store/modules/admin';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store';
import AdminContent from '../../features/admin/components/AdminContent/AdminContent';
import { useAdmin } from '../../features/admin/admin.hook';

const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 50px);
  margin-top: 50px;
  background-color: ${(props) => props.theme.colors.gray_background};
  padding: 10px;

  @media (max-width: 640px) {
    padding: 20px 0;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 754px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const TitleWrapper = styled.div`
  @media (max-width: 640px) {
    display: flex;
    justify-content: center;
  }
`;

const Admin = (): JSX.Element => {
  const { imgFile, isResultScreen, handleImgFile } = useAdmin();

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>만들어 보아요</Title>
        </TitleWrapper>

        <AdminContent subtitle={'유저등록'}>
          <UserForm />
        </AdminContent>

        <AdminContent subtitle={'이미지 등록'}>
          <ImageUpload handleImgFile={handleImgFile} />
        </AdminContent>

        <AdminContent subtitle={'선택지 작성'}>
          <SelectCard />
        </AdminContent>

        {isResultScreen && (
          <AdminContent subtitle={'결과작성'}>
            <ResultCard ImgFile={imgFile} />
          </AdminContent>
        )}
      </Container>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const id = context.params.id;
    const cookie = context.req.headers.cookie ? context.req.headers.cookie : '';

    try {
      await store
        .dispatch(fetchAdminData({ cardId: id, cookie: cookie }))
        .unwrap();
    } catch (error) {
      return {
        props: {
          error: { statusCode: error, message: 'Error!' },
        },
      };
    }
  });

export default Admin;
