"use client"
import styled from "@emotion/styled";

export const Menu = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    max-width: 1700px;
    margin: 0 auto;
`
export const UlRight = styled.ul`
    list-style: none;
    display: flex;
    font-weight: 500;
    align-items: center;
`

export const TextLogin = styled.p`
    font-size: 1.2rem;
    color: #004E09;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.6;
    }
`

export const BorderSeparator = styled.div`
    width: 3px;
    height: 30px;
    border-radius: 999px;
    background-color: #004E09;
    margin: 0 1rem;
`

export const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background-color: #004E09;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.6;
    }
`

export const AvatarLoading = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background-color: #E5E7EB;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
`