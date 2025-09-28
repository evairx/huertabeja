"use client"
import styled from "@emotion/styled";

export const Container = styled.div`
    width: 400px;
`

export const Title = styled.p`
    font-size: 28px;
    color: #414040ff;
`

export const InputContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`

export const Label = styled.p`
    color: #777777;
    font-size: 18px;
    text-transform: uppercase;
`

export const InputContents = styled.div`
    width: 100%;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const Input = styled.input<{ active?: boolean, error?: boolean }>`
    background: #FFFFFF;
    border: 1px solid ${({ error }) => error ? '#FF0000' : '#D3D3D3'};
    width: 100%;
    padding: 10px 40px;
    font-size: 18px;
    transition: border-color 0.5s;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #9c9c9cff;
    }
`
export const InputDiv = styled.div<{ active?: boolean, error?: boolean }>`
    background: #FFFFFF;
    border: 1px solid ${({ error }) => error ? '#FF0000' : '#D3D3D3'};
    width: 100%;
    height: 40px;
    padding: 10px 40px;
    font-size: 18px;
    position: relative;
    overflow: hidden;
`

export const InputsContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    align-items: center;  
`

export const PriceContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
`

export const PriceText = styled.p`
    color: #777777;
    font-size: 18px;
    text-transform: uppercase;
`

export const PriceAmount = styled.p`
    color: #004E09;
    font-size: 22px;
    font-weight: 500;
`

export const ButtonPay = styled.button`
    width: 100%;
    margin-top: 10px;
    background-color: #01700E;
    color: white;
    font-size: 18px;
    letter-spacing: 1px;
    padding: 15px;
    border: none;
    border-radius: 6666px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        opacity: 0.5;
        scale: 0.98;
    }
`

export const ICONS = {
    rutActive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_113)'%3E%3Cpath d='M5.25 9H7.5V12H5.25V9Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V14.25C2.25 14.4489 2.32902 14.6397 2.46967 14.7803C2.61032 14.921 2.80109 15 3 15H15C15.1989 15 15.3897 14.921 15.5303 14.7803C15.671 14.6397 15.75 14.4489 15.75 14.25V5.25C15.75 5.05109 15.671 4.86032 15.5303 4.71967C15.3897 4.57902 15.1989 4.5 15 4.5H10.5' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 3C7.5 2.80109 7.57902 2.61032 7.71967 2.46967C7.86032 2.32902 8.05109 2.25 8.25 2.25H9.75C9.94891 2.25 10.1397 2.32902 10.2803 2.46967C10.421 2.61032 10.5 2.80109 10.5 3V5.25C10.5 5.44891 10.421 5.63968 10.2803 5.78033C10.1397 5.92098 9.94891 6 9.75 6H8.25C8.05109 6 7.86032 5.92098 7.71967 5.78033C7.57902 5.63968 7.5 5.44891 7.5 5.25V3Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.5 12H12' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.5 9H13.5' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_113'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A",
    rutInactive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_113)'%3E%3Cpath d='M5.25 9H7.5V12H5.25V9Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25V14.25C2.25 14.4489 2.32902 14.6397 2.46967 14.7803C2.61032 14.921 2.80109 15 3 15H15C15.1989 15 15.3897 14.921 15.5303 14.7803C15.671 14.6397 15.75 14.4489 15.75 14.25V5.25C15.75 5.05109 15.671 4.86032 15.5303 4.71967C15.3897 4.57902 15.1989 4.5 15 4.5H10.5' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 3C7.5 2.80109 7.57902 2.61032 7.71967 2.46967C7.86032 2.32902 8.05109 2.25 8.25 2.25H9.75C9.94891 2.25 10.1397 2.32902 10.2803 2.46967C10.421 2.61032 10.5 2.80109 10.5 3V5.25C10.5 5.44891 10.421 5.63968 10.2803 5.78033C10.1397 5.92098 9.94891 6 9.75 6H8.25C8.05109 6 7.86032 5.92098 7.71967 5.78033C7.57902 5.63968 7.5 5.44891 7.5 5.25V3Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.5 12H12' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.5 9H13.5' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_113'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
    cardActive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_106)'%3E%3Cpath d='M2.25 6C2.25 5.40326 2.48705 4.83097 2.90901 4.40901C3.33097 3.98705 3.90326 3.75 4.5 3.75H13.5C14.0967 3.75 14.669 3.98705 15.091 4.40901C15.5129 4.83097 15.75 5.40326 15.75 6V12C15.75 12.5967 15.5129 13.169 15.091 13.591C14.669 14.0129 14.0967 14.25 13.5 14.25H4.5C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12V6Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2.25 7.5H15.75' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.25 11.25H5.2575' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 11.25H9.75' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_106'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
    cardInactive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_106)'%3E%3Cpath d='M2.25 6C2.25 5.40326 2.48705 4.83097 2.90901 4.40901C3.33097 3.98705 3.90326 3.75 4.5 3.75H13.5C14.0967 3.75 14.669 3.98705 15.091 4.40901C15.5129 4.83097 15.75 5.40326 15.75 6V12C15.75 12.5967 15.5129 13.169 15.091 13.591C14.669 14.0129 14.0967 14.25 13.5 14.25H4.5C3.90326 14.25 3.33097 14.0129 2.90901 13.591C2.48705 13.169 2.25 12.5967 2.25 12V6Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2.25 7.5H15.75' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.25 11.25H5.2575' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 11.25H9.75' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_106'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
    dateActive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_308)'%3E%3Cpath d='M3 5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H13.5C13.8978 3.75 14.2794 3.90804 14.5607 4.18934C14.842 4.47064 15 4.85218 15 5.25V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V5.25Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 2.25V5.25' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 2.25V5.25' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3 8.25H15' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 11.25H9' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9 11.25V13.5' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_308'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
    dateInactive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_308)'%3E%3Cpath d='M3 5.25C3 4.85218 3.15804 4.47064 3.43934 4.18934C3.72064 3.90804 4.10218 3.75 4.5 3.75H13.5C13.8978 3.75 14.2794 3.90804 14.5607 4.18934C14.842 4.47064 15 4.85218 15 5.25V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V5.25Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 2.25V5.25' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 2.25V5.25' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3 8.25H15' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 11.25H9' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9 11.25V13.5' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_308'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
    cvvActive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_300)'%3E%3Cpath d='M3.75 9.75C3.75 9.35218 3.90804 8.97064 4.18934 8.68934C4.47064 8.40804 4.85218 8.25 5.25 8.25H12.75C13.1478 8.25 13.5294 8.40804 13.8107 8.68934C14.092 8.97064 14.25 9.35218 14.25 9.75V14.25C14.25 14.6478 14.092 15.0294 13.8107 15.3107C13.5294 15.592 13.1478 15.75 12.75 15.75H5.25C4.85218 15.75 4.47064 15.592 4.18934 15.3107C3.90804 15.0294 3.75 14.6478 3.75 14.25V9.75Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61032 12.671 8.80109 12.75 9 12.75C9.19891 12.75 9.38968 12.671 9.53033 12.5303C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25C8.80109 11.25 8.61032 11.329 8.46967 11.4697C8.32902 11.6103 8.25 11.8011 8.25 12Z' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 8.25V5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V8.25' stroke='%23004E09' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_300'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A",
    cvvInactive: "data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_300)'%3E%3Cpath d='M3.75 9.75C3.75 9.35218 3.90804 8.97064 4.18934 8.68934C4.47064 8.40804 4.85218 8.25 5.25 8.25H12.75C13.1478 8.25 13.5294 8.40804 13.8107 8.68934C14.092 8.97064 14.25 9.35218 14.25 9.75V14.25C14.25 14.6478 14.092 15.0294 13.8107 15.3107C13.5294 15.592 13.1478 15.75 12.75 15.75H5.25C4.85218 15.75 4.47064 15.592 4.18934 15.3107C3.90804 15.0294 3.75 14.6478 3.75 14.25V9.75Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.25 12C8.25 12.1989 8.32902 12.3897 8.46967 12.5303C8.61032 12.671 8.80109 12.75 9 12.75C9.19891 12.75 9.38968 12.671 9.53033 12.5303C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25C8.80109 11.25 8.61032 11.329 8.46967 11.4697C8.32902 11.6103 8.25 11.8011 8.25 12Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 8.25V5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25V8.25' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_300'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
};

export const IconUser = styled.div<{ active?: boolean }>`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_483_80)'%3E%3Cpath d='M6 5.25C6 6.04565 6.31607 6.80871 6.87868 7.37132C7.44129 7.93393 8.20435 8.25 9 8.25C9.79565 8.25 10.5587 7.93393 11.1213 7.37132C11.6839 6.80871 12 6.04565 12 5.25C12 4.45435 11.6839 3.69129 11.1213 3.12868C10.5587 2.56607 9.79565 2.25 9 2.25C8.20435 2.25 7.44129 2.56607 6.87868 3.12868C6.31607 3.69129 6 4.45435 6 5.25Z' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.5 15.75V14.25C4.5 13.4544 4.81607 12.6913 5.37868 12.1287C5.94129 11.5661 6.70435 11.25 7.5 11.25H10.5C11.2956 11.25 12.0587 11.5661 12.6213 12.1287C13.1839 12.6913 13.5 13.4544 13.5 14.25V15.75' stroke='%23A4A4A4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_483_80'%3E%3Crect width='18' height='18' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-size: contain;
    transition: all 0.5s;
`

export const IconRut = styled.div<{ active?: boolean }>`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("${({ active }) => active ? ICONS.rutActive : ICONS.rutInactive}");
    background-size: contain;
    transition: all 0.5s;
`

export const IconCard = styled.div<{ active?: boolean, top?: number }>`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("${({ active }) => active ? ICONS.cardActive : ICONS.cardInactive}");
    background-size: contain;
    transition: all 0.5s;
`

export const IconDate = styled.div<{ active?: boolean }>`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("${({ active }) => active ? ICONS.dateActive : ICONS.dateInactive}");
    background-size: contain;
    transition: all 0.5s;
`

export const IconCvv = styled.div<{ active?: boolean, top?: number }>`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("${({ active }) => active ? ICONS.cvvActive : ICONS.cvvInactive}");
    background-size: contain;
    transition: all 0.5s;
`