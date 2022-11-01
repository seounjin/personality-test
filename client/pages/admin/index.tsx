import { Wrapper, Container, TitleWrapper, Title } from './styles';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import UserForm from '../../components/UserForm/UserForm';
import useAdmin from '../../hooks/useAdmin';
import AdminContent from '../../components/AdminContent/AdminContent';

const Admin = (): JSX.Element => {
  const { ImgFile, isResultScreen, handleImgFile } = useAdmin();

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
          <SelectContainer />
        </AdminContent>

        {isResultScreen && (
          <AdminContent subtitle={'결과작성'}>
            <ResultContainer ImgFile={ImgFile} />
          </AdminContent>
        )}
      </Container>
    </Wrapper>
  );
};

export default Admin;
