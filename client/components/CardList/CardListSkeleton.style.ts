import styled from 'styled-components';

export const SkeletonHeader = styled.div`
  padding-top: 75%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.skeletionColor};
  animation: ${({ theme }) => theme.skeletonGradation};
`;

export const SkeletonBarWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;
