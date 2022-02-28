import styled from 'styled-components';

interface Wrapper {
  isVisible: boolean;
}

const Wrapper = styled.div<Wrapper>`
  font-size: 18px;
  width: 100%;
  .select_wrapper {
    display: flex;
    margin: 10px;
    ${(props) =>
      props.isVisible === true
        ? `
      justify-content: space-between;`
        : `align-items: center;
        flex-direction: column;
      `}
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
