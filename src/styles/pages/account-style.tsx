"use client"
import styled from "@emotion/styled"

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`

export const HeaderContent = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Dropdowm = styled.div`
    position: relative;
    display: none;

    @media (max-width: 1200px) {
        display: block;
    }
`

export const TitlePage = styled.h1`
    font-size: 2rem;
    font-weight: 500;

    @media (max-width: 1600px) {
        font-size: 1.8rem;
    }
`

export const Main = styled.main`
    margin-top: 20px;
    display: flex;
    width: 100%;
    gap: 40px;

    @media (max-width: 1600px) {
        gap: 30px;
    }
`

export const Menu = styled.nav`
    background-color: #F9F9F8;
    padding: 20px;
    border: 1px solid #DBDBDB;
    width: 350px;
    border-radius: 11px;

    @media (max-width: 1200px) {
        display: none;
        pointer-events: none;
        user-select: none;
    }
`

export const TitleMenu = styled.h2`
    font-size: 1.250rem;
    font-weight: 500;
    margin-bottom: 10px;

    @media (max-width: 1600px) {
        font-size: 1.1rem;
    }
`

export const OptionsContent = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;

    @media (max-width: 1600px) {
        gap: 8px;
    }
`

export const Option = styled.li`
    font-size: 1.1rem;
    cursor: pointer;
    padding: 10px 15px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
        opacity: 0.4;
    }

    @media (max-width: 1600px) {
        font-size: 1rem;
        padding: 8px 12px;
    }
`

export const Content = styled.div`
    flex: 1;
`

export const TitleTab = styled.h1`
    font-size: 1.7rem;
    font-weight: 500;

    @media (max-width: 1600px) {
        font-size: 1.5rem;
    }
`

export const SubTitleTab = styled.h2<{ weight?: number, mt?: number }>`
    font-size: 1.150rem;
    font-weight: ${({ weight }) => weight || 400};
    color: #595959;
    margin-top: ${({ mt }) => mt || 5}px;

    @media (max-width: 1600px) {
        font-size: 1rem;
    }
`

export const EmailText = styled.p`
    font-size: 1.150rem;
    font-weight: 500;
    margin-top: 10px;

    @media (max-width: 1600px) {
        font-size: 1rem;
    }
`

export const EmailLoading = styled.div`
    background-color: #E0E0E0;
    width: 250px;
    height: 27px;
    border-radius: 5px;
    margin-top: 10px;
    animation: pulse 1.5s infinite;

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

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    min-height: 100px;
`

export const Button = styled.button`
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

    @media (max-width: 1400px) {
      padding: 13px 16px;
      font-size: 1rem;
      margin-top: 0px;
    }
`
