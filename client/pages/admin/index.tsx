import { Wrapper, Container } from '../../features/admin/admin.styles';
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
        <StepForm />
      </Container>
    </Wrapper>
  );
};

export default Admin;
