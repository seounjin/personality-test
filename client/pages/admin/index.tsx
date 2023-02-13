import { Wrapper, Container } from '../../features/admin/admin.styles';
import Stepper from '../../features/admin/container/Stepper/Stepper';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';

const Admin = (): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <Stepper />
      </Container>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async (auth: boolean) => {
    if (auth) {
      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=admin', permanent: false },
    };
  },
});

export default Admin;
