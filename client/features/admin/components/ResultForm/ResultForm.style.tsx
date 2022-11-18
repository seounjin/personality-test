import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  width: 100%;
  margin: 10px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const HeaderContainer = styled(ContentContainer)`
  font-size: 1.5rem;
`;

export const ShadowBox = styled.div`
  width: 280px;
  margin-top: 6px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const Label = styled.label`
  font-size: 1.5rem;
  margin: 4px 0;
  font-weight: bold;
`;

export const P = styled.p`
  margin: 0;
`;

export const Input = styled.input`
  width: 280px;
  height: 28px;
  margin: 4px 0;
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const Textarea = styled.textarea`
  width: 280px;
  height: 130px;
  resize: none;
  border: none;
  outline: none;
  margin: 4px 0;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
