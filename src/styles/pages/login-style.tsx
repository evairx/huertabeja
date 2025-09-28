"use client"
import styled from "@emotion/styled";

export const Container = styled.main`
    min-height: 100dvh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div<{ height?: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${({ height }) => height || "100vh"};
    gap: 20px;
    padding: 0 20px;
`;

export const LeftSide = styled.div<{ width?: string }>`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width || "0px"};
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
    animation: fadeIn 1s ease-in-out;

    img {
      max-height: 90%;
      width: auto;
      object-fit: contain;
    }

    @media (max-width: 1050px) {
      display: none;
    }

    @animation fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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
export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const Input = styled.input<{ emailError?: boolean, passwordError?: boolean }>`
    width: 100%;
    background: #fff;
    border: none;
    padding: 13px 52px;
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
`

export const IconMail = styled.div<{ focus?: boolean, active?: boolean, emailError?: boolean }>`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  opacity: ${({ focus, active }) => (active ? 1: focus ? 1 : 0.5)};
  transition: all 0.3s ease-in-out;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${({ active, focus }) => 
    !active 
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${focus ? '%23004E09' : 'currentColor'}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-mail'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z' /%3E%3Cpath d='M3 7l9 6l9 -6' /%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${focus ? '%23004E09' : 'currentColor'}' class='icon icon-tabler icons-tabler-filled icon-tabler-mail'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z' /%3E%3Cpath d='M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z' /%3E%3C/svg%3E")`
  };
`

export const IconPassword = styled.div<{ focus?: boolean, active?: boolean, emailError?: boolean }>` 
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  opacity: ${({ focus, active }) => (active ? 1: focus ? 1 : 0.5)};
  transition: all 0.3s ease-in-out;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${({ active, focus }) =>
    !active
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${focus ? '%23004E09' : 'currentColor'}'  stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-lock'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z' /%3E%3Cpath d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0' /%3E%3Cpath d='M8 11v-4a4 4 0 1 1 8 0v4' /%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${focus ? '%23004E09' : 'currentColor'}' class='icon icon-tabler icons-tabler-filled icon-tabler-lock'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3' /%3E%3C/svg%3E")`
  }
`

export const IconEye = styled.div<{ active?: boolean, showPassword?: boolean }>`
  position: absolute;
  top: 50%;
  right: 20px;
  width: 28px;
  height: 28px;
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: translateY(-50%);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${({ showPassword }) =>
    showPassword
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-eye-off'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10.585 10.587a2 2 0 0 0 2.829 2.828' /%3E%3Cpath d='M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87' /%3E%3Cpath d='M3 3l18 18' /%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-eye'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' /%3E%3Cpath d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' /%3E%3C/svg%3E")`
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