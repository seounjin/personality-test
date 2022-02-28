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
    align-items: center;
    margin: 10px;

    input {
      width: 260px;
      margin: 4px 0;
    }
    label {
      margin: 4px 0;
      font-weight: bold;
    }

    p {
      color: #808080;
    }
  }
  textarea {
    width: 260px;
    height: 130px;
    resize: none;
    margin: 4px 0;
  }
`;

export default Wrapper;
