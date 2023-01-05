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
  width: 140px;
  text-align: center;
  word-wrap: break-word;
  line-height: 20px;
  font-size: 1.5rem;
`;

export const Label = styled.label`
  font-size: 1.5rem;
`;

export const HelperTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
`;
