import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 20px 0;
`;

export const SubTitleWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;