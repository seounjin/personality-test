import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  .user_container {
    margin: 10px;
    width: 100%;
  }

  .user_wrapper {
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }

  p {
    color: #808080;
  }
`;

export default Wrapper;
