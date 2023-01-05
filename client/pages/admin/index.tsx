import { Wrapper, Container } from '../../features/admin/admin.styles';
import { useEffect } from 'react';
import Stepper from '../../features/admin/container/Stepper/Stepper';
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
        <Stepper />
      </Container>
    </Wrapper>
  );
};

export default Admin;
