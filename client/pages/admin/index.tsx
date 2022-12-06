import {
  TitleWrapper,
  Title,
  Wrapper,
  Container,
} from '../../features/admin/admin.styles';
import { useEffect } from 'react';
import StepForm from '../../features/admin/container/StepForm/StepForm';
import { useDispatch } from 'react-redux';
import { reSetAdminData } from '../../store/modules/admin';

const Admin = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reSetAdminData());
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>만들어 보아요</Title>
        </TitleWrapper>
        <StepForm />
      </Container>
    </Wrapper>
  );
};

export default Admin;
