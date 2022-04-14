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
      width: 320px;
      height: 24px;
      margin: 4px 0 4px 0;
      border: none;
      outline: none;
      // background-color: ${(props) => props.theme.colors.gray_background};
      border-radius: 2px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }
`;

export default Wrapper;
