import styled from 'styled-components';

const Wrapper = styled.div`
  .inputform_container {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    label {
      margin: 4px 0 4px 0;
      font-weight: bold;
    }

    input {
      width: 340px;
      height: 24px;
      margin: 4px 0 4px 0;
      border: none;
      outline: none;
      background-color: ${(props) => props.theme.colors.gray_background};
    }
  }
`;

export default Wrapper;
