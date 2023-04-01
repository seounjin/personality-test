import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px;
`;
export const HeaderSkeleton = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  width: 250px;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.skeletionColor};

  animation: ${({ theme }) => theme.skeletonGradation};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  height: 250px;
`;
