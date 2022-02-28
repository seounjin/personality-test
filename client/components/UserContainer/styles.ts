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

  label {
    margin: 4px 0 4px 0;
    font-weight: bold;
  }

  input {
    margin: 4px 0 4px 0;
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.colors.gray_background};
  }

  p {
    color: #808080;
  }
`;

export default Wrapper;
