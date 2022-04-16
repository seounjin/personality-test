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

    input[type='password'] {
      font-family: 'Malgun gothic', dotum, sans-serif;
    }

    input {
      width: 320px;
      height: 24px;
      margin: 4px 0 4px 0;
      border: rgba(27, 31, 35, 0.15) solid 2px;
      outline: none;
      border-radius: 2px;
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
    }
  }
`;

export default Wrapper;
