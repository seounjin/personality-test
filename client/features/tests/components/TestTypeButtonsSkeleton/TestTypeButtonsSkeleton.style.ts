import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px;
`;

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
    }
`;

export const HeaderSkeleton = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  width: 250px;
  height: 250px;
  background-color: #bfbfbf;

  animation: ${pulse} 2s ease-in-out infinite;
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

export const ContentSkeleton = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.skeletionColor};
  margin-top: 20px;
  width: 100%;
  height: 20px;
  animation: ${pulse} 2s ease-in-out infinite;
`;
