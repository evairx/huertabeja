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

export const LeftContent = styled.div<{ width?: string }>`
    display: flex;
    width: ${({ width }) => width || "400px"};
    flex-direction: column;
    gap: 20px;
`

export const LogoContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
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

export const Loading = styled.div<{ color?: string, secondColor?: string }>`
    border: 2px solid ${({ secondColor }) => secondColor || "#f7f7f7ff"};
    border-top: 2px solid ${({ color }) => color || "#000000ff"};
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

export const ImageContainer = styled.div<{ height?: string }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: ${({ height }) => height || "100%"};

    img {
      max-height: 90%;
      width: auto;
      object-fit: contain;
    }

    @media (max-width: 1050px) {
      display: none;
    }
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const LabelText = styled.p`
    color: #696969;
    font-weight: 500;
    font-size: 1.050rem;
    letter-spacing: .100em;
    margin-bottom: 8px;
    margin-top: 8px;
`
export const Input = styled.input<{ emailError?: boolean, passwordError?: boolean }>`
    width: 100%;
    background: #fff;
    border: none;
    padding: 13px 20px;
    -webkit-box-shadow: 1px 8px 14px -8px rgba(0,0,0,0.15); 
    box-shadow: 1px 8px 14px -8px rgba(0,0,0,0.15);
    border-radius: 666px;
    font-size: 1.2rem;
    font-weight: 500;
    border: 2px solid rgba(255, 255, 255, 1);
    border-color: ${({ emailError, passwordError }) => (emailError ? '#fa7272ff' : passwordError ? '#fa7272ff' : 'rgba(255, 255, 255, 1)')};
    transition: all .3s ease-in-out;

    &:focus {
      outline: none;
      border: 2px solid #004E09;
      background: #ffffffcc;
    }

    &::selection {
      background: #028f1271;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: #000 !important;
      transition: background-color 5000s ease-in-out 0s;
    }


    &[type="password"]  {
    -webkit-text-security: disc; /* circle, square, none */
    }
`

export const ButtonSignIn = styled.button`
    width: 100%;
    background: #01700eff;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 15px 20px;
    margin-top: 10px;
    border-radius: 666px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 70px;

    &:hover {
      scale: 0.97;
      opacity: 0.6;
    }
`

export const ForgotPassword = styled.p`
    display: block;
    text-align: right;
    color: #01700eff;
    font-weight: 500;
    text-decoration: none;
    font-size:1.090rem;
    margin-top: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      text-decoration: underline;
      opacity: 0.6;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
`