import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 50px);
  background-color: ${(props) => props.theme.colors.gray_background};
  padding: 10px;

  .admin_wrapper {
    margin: 0 auto;
    max-width: 1060px;
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
`;

export default Wrapper;
