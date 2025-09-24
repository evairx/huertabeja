import styled from "@emotion/styled";

export const CartContainer = styled.div<{ open: boolean }>`
  position: fixed;
  width: 470px;
  background-color: #eee;
  z-index: 999;
  height: 95%;
  top: 1.35rem;
  border-radius: 15px;
  right: ${({ open }) => (open ? "1rem" : "-48rem")};
  transition: right 0.2s ease-in-out;
  padding: 1rem;
`;

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  pointer-events: auto;
  overflow-y: hidden;
  background: #00000085;
  transition: opacity 0.3s ease-out;
  z-index: 998;
  opcacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`
