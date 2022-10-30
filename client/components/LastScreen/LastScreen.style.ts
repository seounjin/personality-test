import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 17px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  height: 4.4rem;
  margin-bottom: 15px;

  background-color: #5963ff;
  border: 2px solid;
  border-radius: 20px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const Title = styled.span`
  color: white;
`;

export const RestartButton = styled.button`
  width: 27.8rem;
  height: 4.9rem;
  border: none;
  background: url('/restart-button.png') no-repeat;
  background-position: center;
  background-size: contain;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

export const ContentWrapper = styled.div`
  width: 34rem;
  height: 44rem;
  background: url('/window-character.png') no-repeat;
  background-size: contain;
  margin-bottom: 2.5rem;
  padding: 0 10px 0;
`;

export const Content = styled.div`
  margin-top: 4rem;
  padding: 0 6px 0;
  font-size: 1.3rem;
  line-height: 1.3;
`;
