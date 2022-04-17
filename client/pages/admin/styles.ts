import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 50px);
  background-color: ${(props) => props.theme.colors.gray_background};
  padding: 10px;

  h2 {
    font-size: 1.8rem;
  }
  .admin_wrapper {
    margin: 0 auto;
    // width: 100%;
    max-width: 754px;
  }

  .admin_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    margin: 20px 0;
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 8px;
    height: 100%;
  }

  @media (max-width: 640px) {
    padding: 20px 0;
    background-color: ${(props) => props.theme.colors.white};

    // .admin_wrapper {
    //   width: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    // }

    .admin_title {
      display: flex;
      justify-content: center;
    }

    .admin_content {
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

export default Wrapper;
