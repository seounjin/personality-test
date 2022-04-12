import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 13px;
  .selectform_title {
    margin: 10px 0 10px 0;
    label {
      font-weight: bold;
    }
  }

  .selectform_content {
    width: 340px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding: 12px;
    font-weight: bold;
    line-height: 20px;
    p {
      margin: 0;
      color: #808080;
    }
  }
`;

export default Wrapper;
