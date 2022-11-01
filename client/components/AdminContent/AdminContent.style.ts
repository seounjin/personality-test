import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  margin: 20px 0;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 8px;
  height: 100%;

  @media (max-width: 640px) {
    border-radius: 0;
    box-shadow: none;
  }
`;
