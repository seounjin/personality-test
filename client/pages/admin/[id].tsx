import { Wrapper, Container } from '../../features/admin/admin.styles';
import Stepper from '../../features/admin/container/Stepper/Stepper';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import fetcher from '../../api/fetcher';
import { setIsAuth } from '../../store/modules/home';
import { setMode, setPersonalityTestItems } from '../../store/modules/admin';

const AdminPage = (): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <Stepper />
      </Container>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, id, cookie, store }) => {
    if (auth) {
      store.dispatch(setIsAuth(true));

      const headers = {
        Cookie: cookie,
      };
      const res = await fetcher(
        'get',
        `/personality/detail-personality/${id}`,
        { headers },
      );
      if (res.success) {
        const {
          basicInformationItems,
          selectItems: { selectItems },
          resultItems: { resultItems },
        } = res.data;

        store.dispatch(setMode({ mode: 'update' }));
        store.dispatch(
          setPersonalityTestItems({
            title: basicInformationItems.title,
            explain: basicInformationItems.explain,
            typeFormItems: [...resultItems],
            selectFormItems: [...selectItems],
            isPublic: basicInformationItems.isPublic,
          }),
        );
      }

      if (res.status >= 500) {
        return {
          props: {
            error: {
              statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
              message: 'Error!',
            },
          },
        };
      }

      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=admin', permanent: false },
    };
  },
});

export default AdminPage;
