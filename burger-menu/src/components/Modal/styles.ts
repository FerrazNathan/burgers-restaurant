import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
  padding: 1rem 0;
`;

export const ModalContent = styled.div`
  background: ${(props) => props.theme.colors.background.standard};
  padding: 1rem;
  border-radius: ${(props) => props.theme.border.radius.xs};
  max-width: 500px;
  width: 100%;
  position: relative;
  margin: 0 1rem;
  width: 95%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
`;
