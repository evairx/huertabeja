import styled from "@emotion/styled";

export const AlertContainer = styled.div<{ open: boolean }>`
    position: fixed;
    top: ${({ open }) => open ? '2rem' : '-10rem'};
    right: 50%;
    transform: translateX(50%);
    background-color: #ffb0b0ff;
    color: #EB0000;
    padding: .700rem;
    font-weight: 500;
    font-size: 1.1rem;
    width: 40rem;
    border-radius: 666px;
    text-align: center;
    border: 2px solid #EB0000;
    transition: top 0.2s ease-in-out;

    @media (max-width: 1600px) {
        font-size: 1rem;
        width: 35rem;
    }

    @media (max-width: 600px) {
        font-size: .9rem;
        width: 90%;
        padding-left: 2.5rem;
    }
`

export const InfoSvgContainer = styled.div`
    position: absolute;
    left: 1rem;
    top: 58%;
    transform: translateY(-50%);
`

export const PercentageContainer = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-radius: 666px;
`

export const Percentage = styled.div<{ percentage: number }>`
    height: 4px;
    max-width: 92%;
    width: ${({ percentage }) => percentage}%;
    background-color: #b80000ff;
    border-radius: 666px;
    margin: 0 auto;
    text-align: center;
`