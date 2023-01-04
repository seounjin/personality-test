import styled from 'styled-components';

export const Container = styled.div`
  width: 280px;
  margin: 20px 0;
  div: last-child {
    margin-bottom: 0px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const LabelWrapper = styled.div`
  width: 130px;
  display: flex;
  justify-content: center;
  word-wrap: break-word;
  line-height: 20px;
`;

export const Label = styled.label`
  font-size: 1.5rem;
`;
