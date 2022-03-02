import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 17px;

  .result-name {
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

    & :first-child {
      color: white;
    }
  }

  .restart-button {
    width: 27.8rem;
    height: 4.9rem;
    border: none;
    background: url('/restart-button.png') no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
`;

export default Wrapper;
