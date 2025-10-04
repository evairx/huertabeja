import styled from "@emotion/styled";

export const CartContainer = styled.div<{ open: boolean }>`
  position: fixed;
  width: 510px;
  background-color: #F9F9F8;
  z-index: 999;
  height: 95%;
  top: 1.35rem;
  border-radius: 8px;
  border: 2px solid #DBDBDB;
  right: ${({ open }) => (open ? "2rem" : "-48rem")};
  transition: right 0.4s ease-in-out;
  padding: 2rem 1.5rem;

  @media (max-width: 850px) {
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 0;
    right: ${({ open }) => (open ? "0" : "-100%")};
    opacity: ${({ open }) => (open ? 1 : 0)};
  }
`;

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  z-index: 998;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

export const CloseButton = styled.button`
  background: none;
  border: 2px solid var(--secondary-color);
  padding: 0.5rem 1rem;
  border-radius: 6666px;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--secondary-color);
    color: white;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`

export const BorderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: var(--secondary-color);
  margin-top: 1rem;
  opacity: 0.2;
`

export const CountInfo = styled.div`
  margin-top: 0.8rem;
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CountText = styled.p`
  font-size: 1.1rem;
  `

export const CartTitle = styled.h1`
  font-weight: 500;
  font-size: 1.7rem;
`

export const CartContent = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
  margin-top: 1rem;
  padding: 0.5rem;
`

export const CartItem = styled.div`
  display: flex;
  gap: 1rem;
`

export const CartItemImage = styled.img`
  width: 140px;
  height: 140px;
`

export const CartItemTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
`

export const CartItemQuantity = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 0.2rem;
  color: #555;
`