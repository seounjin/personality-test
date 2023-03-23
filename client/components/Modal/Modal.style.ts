import styled from 'styled-components';
import xMarkSolidSvgIcon from '../../assets/icons/xmark-solid.svg';

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgb(0, 0, 0, 0.6);
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  margin: 0 8px;
  overflow-y: auto;
  max-width: 90%;
  max-height: 80%;
`;

export const ModalHeadLilne = styled.div`
  width: 100%;
`;

export const XMarkIconWrapper = styled.div`
  cursor: pointer;
  float: right;
`;

export const XMarkIcon = styled(xMarkSolidSvgIcon)`
  width: 25px;
  height: 25px;
`;
