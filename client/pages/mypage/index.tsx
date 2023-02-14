import styled from 'styled-components';
import Aside from '../../features/mypage/container/Aside/Aside';
import TebPanel from '../../features/mypage/container/TabPanel/TabPanel';

export const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.mypageBackgroundColor};
  padding-top: 50px;
`;

export const Container = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  display: flex;
`;

const MyPage = () => {
  return (
    <Wrapper>
      <Container>
        <Aside />
        <TebPanel />
      </Container>
    </Wrapper>
  );
};

export default MyPage;
