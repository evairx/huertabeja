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

    @media (max-width: 950px) {
        padding: 2rem 2rem;
    }

    @media (max-width: 750px) {
        padding: 1.5rem 1.5rem;
    }
`
export const Ulcenter = styled.ul`
    list-style: none;
    display: flex;
    font-size: 1.2rem;
    font-weigh: 500;
    align-items: center;
    gap: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media (max-width: 850px) {
        display: none;
    }
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
    position: relative;

    &:hover {
        transform: scale(0.96);
        opacity: 0.8;
    }
`

export const CounterCart = styled.div`
    width: 28px;
    height: 28px;
    background: var(--bg-primary-color);
    color: var(--color-black);
    position: absolute;
    right: -10px;
    top: -7px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border-radius: 999px;
    font-size: 1.1rem;
    -webkit-box-shadow: 0px 0px 18px -6px #000000; 
    box-shadow: 0px 0px 18px -6px #000000;
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

export const UserContainer = styled.div`
    position: relative;
  
`

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    position: relative;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(0.98);
        opacity: 0.8;
    }
`

export const Avatar = styled.div`
    display: inline-block;
    border-radius: 50%;
    border: 2px solid #2c6e49;
    padding: 2px;
    width: 44px;
    height: 44px;
    overflow: hidden;
`

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 50%;
`

export const UserName = styled.p`
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-black);

    @media (max-width: 850px) {
        display: none;
    }
`

export const OptionsMenu = styled.div<{ open: boolean }>`
    position: absolute;
    top: 60px;
    background: var(--bg-primary-color);
    width: 240px;
    min-height: 130px;
    border-radius: 8px;
    padding: 1rem;
    flex-direction: column;
    gap: 10px;
    z-index: 999;
    -webkit-box-shadow: 0px 0px 15px -4px rgba(0,0,0,0.19); 
    box-shadow: 0px 0px 15px -4px rgba(0,0,0,0.19);
    opacity: ${({ open }) => (open ? "1" : "0")};
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
    transition: all 0.3 ease-in-out;

    @media (max-width: 1750px) {
        right: -30px;
    }
    @media (max-width: 850px) {
        right: -70px;
    }
`

export const OptionsItem = styled.div`
    font-size: 1.1rem;
    background: none;
    padding: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #f3f3f3ff;
    }
`

export const ChevronIcon = styled.div<{ open: boolean }>`
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: contain;
    transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0deg)")};
    margin-top: ${({ open }) => (open ? "2px" : "0")};
    transition: transform 0.3s ease-in-out;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23004E09' class='icon icon-tabler icons-tabler-filled icon-tabler-caret-down'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z' /%3E%3C/svg%3E");
`