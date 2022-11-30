import ImageUpload from '../../features/admin/container/ImageUpload/ImageUpload';
import ResultCard from '../../features/admin/container/ResultCard/ResultCard';
import SelectCard from '../../features/admin/container/SelectCard/SelectCard';
import UserForm from '../../features/admin/components/UserForm/UserForm';
import { useAdmin } from '../../features/admin/admin.hook';
import AdminContent from '../../features/admin/components/AdminContent/AdminContent';
import {
  TitleWrapper,
  Title,
  Wrapper,
  Container,
} from '../../features/admin/components/admin.styles';
import TitleForm from '../../features/admin/container/TitleForm/TitleForm';

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

        <AdminContent subtitle={'제목'}>
          <TitleForm />
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

export default Admin;
