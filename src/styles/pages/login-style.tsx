"use client"
import styled from "@emotion/styled";

export const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 20px;
  padding: 0 20px;
`;

export const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const LeftContent = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  gap: 20px;
`

export const TextH1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: .100em;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;
`

export const ProviderButton = styled.button<{ Loading?: boolean }>`
  width: 100%;
  background: #fff;
  border: none;
  padding: 15px 20px;
  -webkit-box-shadow: 1px 8px 14px -8px rgba(0,0,0,0.15); 
  box-shadow: 1px 8px 14px -8px rgba(0,0,0,0.15);
  border-radius: 666px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: ${({ Loading }) => (Loading ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;

  ${({ Loading }) => (!Loading && `
    &:hover {
      scale: 0.97;
      opacity: 0.5;
    }
  `)}
`

export const Loading = styled.div`
  border: 2px solid #f7f7f7ff;
  border-top: 2px solid #000000ff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
` 

export const Divider = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  color: #000;
  font-weight: 500;

  &::before, &::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid #aaaaaa65;
    margin: 0 10px;
  }
`

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;

  img {
    max-height: 90%;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: 1050px) {
    display: none;
  }
`;
