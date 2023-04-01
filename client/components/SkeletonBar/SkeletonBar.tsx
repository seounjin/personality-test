import React from 'react';
import styled from 'styled-components';

interface SkeletonBarProps {
  width: string;
  height: string;
}

const Skeleton = styled.div<SkeletonBarProps>`
  border-radius: 4px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.skeletionColor};
  animation: ${({ theme }) => theme.skeletonGradation};
`;

const SkeletonBar = ({ width, height }: SkeletonBarProps): JSX.Element => {
  return <Skeleton width={width} height={height} />;
};

export default SkeletonBar;
