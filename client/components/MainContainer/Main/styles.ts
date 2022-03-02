import styled from 'styled-components';

interface wrapper {
  opacity: number;
}

const Wrapper = styled.div<wrapper>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s;

  width: 100%;
  height: 100%;
  font-size: 1.6rem;

  .question-wrapper {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0%);

    .question {
      width: 276px;
      text-align: center;
      padding: 40px 40px 0 40px;
    }
  }

  .button-wrapper {
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translate(-50%, 0%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .select-button-1 {
      width: 280px;
      height: 72px;
      border: none;
      border-radius: 22px;
      background-color: #f1f1f1;
      margin-bottom: 20px;
    }

    .select-button-2 {
      width: 280px;
      height: 72px;
      border: none;
      border-radius: 22px;
      background-color: #5963ff;
      color: white;
    }
  }
`;

export default Wrapper;
