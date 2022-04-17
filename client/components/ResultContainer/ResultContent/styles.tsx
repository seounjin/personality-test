import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 18px;
  width: 100%;

  .result_content_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
  .result_content_wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px;

    input {
      width: 280px;
      height: 28px;
      margin: 4px 0;
      border: none;
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
    label {
      font-size: 1.5rem;
      margin: 4px 0;
      font-weight: bold;
    }

    p {
      color: #808080;
    }
  }
  textarea {
    width: 280px;
    height: 130px;
    resize: none;
    border: none;
    outline: none;
    margin: 4px 0;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
`;

export default Wrapper;
