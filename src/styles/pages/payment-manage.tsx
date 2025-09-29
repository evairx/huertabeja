"use client";
import styled from "@emotion/styled";

export const Container = styled.div`
    padding: 20px;
`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

export const Main = styled.main<{ width: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px;
    height: calc(100dvh - 150px);
    width: ${({ width }) => width || '600px'};
    margin: 0 auto;

    a {
        text-decoration: none;
        underline: none;
    }

    @media (max-width: 1600px) {
       gap: 0px;
    }

    @media (max-width: 1200px) {
        width: 100%;
    }
`

export const Title = styled.p`
    font-size: 2rem;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: #000000ff;
    margin-bottom: 15px;
`

export const ContainerCards = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const CardLoadingSkeleton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 2px solid #E0E0E0;
    width: 100%;
    height: 59px;
    padding: 13px 45px;
    border-radius: 10px;

    background-color: #c2c2c2bb;
    animation: pulse 1.4s ease-in-out infinite;

    @keyframes pulse {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 2px solid #E0E0E0;
    width: 100%;
    padding: 13px 45px;
    border-radius: 10px;
    position: relative;
`

export const CardText = styled.p`
    font-size: 1.2rem;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonAdd = styled.button`
    width: 100%;
    background: #01700eff;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 15px 55px;
    margin-top: 10px;
    border-radius: 666px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 70px;
    margin-top: 20px;

    &:hover {
      scale: 0.97;
      opacity: 0.6;
    }
`

export const CardSvg = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_526_61)'%3E%3Cpath d='M2.5 6.66666C2.5 6.00362 2.76339 5.36773 3.23223 4.89889C3.70107 4.43005 4.33696 4.16666 5 4.16666H15C15.663 4.16666 16.2989 4.43005 16.7678 4.89889C17.2366 5.36773 17.5 6.00362 17.5 6.66666V13.3333C17.5 13.9964 17.2366 14.6322 16.7678 15.1011C16.2989 15.5699 15.663 15.8333 15 15.8333H5C4.33696 15.8333 3.70107 15.5699 3.23223 15.1011C2.76339 14.6322 2.5 13.9964 2.5 13.3333V6.66666Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2.5 8.33334H17.5' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.83337 12.5H5.84087' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.16663 12.5H10.8333' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_526_61'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const ButtonTrash = styled.button`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 20px;
    top: 50%;
    background-color: transparent;
    transform: translateY(-50%);
    border: none;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_526_68)'%3E%3Cpath d='M3.33325 5.83334H16.6666' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33325 9.16666V14.1667' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.6667 9.16666V14.1667' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.16675 5.83334L5.00008 15.8333C5.00008 16.2754 5.17568 16.6993 5.48824 17.0119C5.8008 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0119C14.8245 16.6993 15.0001 16.2754 15.0001 15.8333L15.8334 5.83334' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_526_68'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.6;
        scale: 0.97;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_526_68)'%3E%3Cpath d='M3.33325 5.83334H16.6666' stroke='red' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.33325 9.16666V14.1667' stroke='red' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.6667 9.16666V14.1667' stroke='red' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.16675 5.83334L5.00008 15.8333C5.00008 16.2754 5.17568 16.6993 5.48824 17.0119C5.8008 17.3244 6.22472 17.5 6.66675 17.5H13.3334C13.7754 17.5 14.1994 17.3244 14.5119 17.0119C14.8245 16.6993 15.0001 16.2754 15.0001 15.8333L15.8334 5.83334' stroke='red' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 5.83333V3.33333C7.5 3.11232 7.5878 2.90036 7.74408 2.74408C7.90036 2.5878 8.11232 2.5 8.33333 2.5H11.6667C11.8877 2.5 12.0996 2.5878 12.2559 2.74408C12.4122 2.90036 12.5 3.11232 12.5 3.33333V5.83333' stroke='red' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_526_68'%3E%3Crect width='20' height='20' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    }

`

export const ContainerAdd = styled.div`
    padding: 20px;
    width: 100%;
    min-height: 400px;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 1;
        }
    }

    @media (max-width: 1600px) {
        min-height: 300px;
    }
`

export const Label = styled.label`
    color: #696969;
    font-weight: 500;
    font-size: 1.050rem;
    letter-spacing: .100em;
    margin-bottom: 8px;
    margin-top: 8px;

    @media (max-width: 1600px) {
        font-size: 1rem;
    }
`

export const Loading = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 35%;
    transform: translateY(-50%);
    border: 2px solid #000000ff;
    border-top: 2px solid #d6d6d6ff;
    border-radius: 50%;
    animation: spin .6s linear infinite;
    margin: 0 auto;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export const ContainerInputs = styled.div<{ open: boolean }>`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
    z-index: 1000;
    transition: all 0.2s ease-in-out;
    -webkit-box-shadow: 0px 18px 15px -12px rgba(0,0,0,0.22); 
    box-shadow: 0px 18px 15px -12px rgba(0,0,0,0.22);
`

export const ContentInputs = styled.div`
    background-color: white;
    border: 2px solid #E0E0E0;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    max-width: 600px;
`

export const TitleInputs = styled.p`
    font-size: 18px;
    letter-spacing: 0.10em;
    font-weight: 500;
    color: #000000ff;
    margin-bottom: 30px;
    max-width: 400px;
    text-align: center;
`

export const ButtonDisplay = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

export const Button = styled.button`
    width: 120px;
    padding: 10px;
    background: none;
    border: 2px solid #01700E;
    font-size: 1.1rem;
    font-weight: 500;
    color: #01700E;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: #01700E;
        color: #fff;
        opacity: 0.7;
        scale: 0.96;
    }
`

export const ButtonCancel = styled.button`
    width: 120px;
    padding: 10px;
    background: #fd5656ff;
    border: 2px solid #fd5656ff;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.7;
        scale: 0.96;
    }
`

export const ButtonAddCard = styled.button`
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
    margin-top: 30px;

    &:hover {
        scale: 0.97;
        opacity: 0.6;
    }
`

export const ButtonAddCardLoading = styled.div`
    margin-top: 30px;
    width: 100%;
    background-color: #c2c2c2bb;
    height: 52px;

    animation: pulse 1.4s ease-in-out infinite;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 1;
        }
    }
`