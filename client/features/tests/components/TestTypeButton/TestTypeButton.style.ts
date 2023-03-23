import styled from 'styled-components';
import Image from 'next/image';

export const Button = styled.button`
  position: relative;
  border: none;
  padding: 0;
  background-color: transparent;
  border-radius: 8px;
`;
export const NextImageWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
`;

export const NextImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export const Content = styled.div`
  width: 250px;
  border-radius: 0 0 8px 8px;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Headline = styled.h1`
  margin: 0;
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;
