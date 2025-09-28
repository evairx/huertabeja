"use client";
import { createContext, PropsWithChildren, useState, useCallback, useMemo } from "react";

interface CardContextType {
    publicCardNumber: string;
    setPublicCardNumber: (value: string) => void;
    publicCardName: string;
    setPublicCardName: (value: string) => void;
    publicRut: string;
    setPublicRut: (value: string) => void;
    publicMonth: string;
    setPublicMonth: (value: string) => void;
    publicYear: string;
    setPublicYear: (value: string) => void;
    publicCvv: string;
    setPublicCvv: (value: string) => void;
    publicProvider: string;
    setPublicProvider: (value: string) => void;
}

export const CardContext = createContext<CardContextType>({
    publicCardNumber: '#### #### #### ####',
    setPublicCardNumber: () => {},
    publicCardName: 'John Doe',
    setPublicCardName: () => {},
    publicRut: '12.345.678-9',
    setPublicRut: () => {},
    publicMonth: '00',
    setPublicMonth: () => {},
    publicYear: '00',
    setPublicYear: () => {},
    publicCvv: '⁕⁕⁕',
    setPublicCvv: () => {},
    publicProvider: '',
    setPublicProvider: () => {}
});

export const CardProvider = ({ children }: PropsWithChildren) => {
    const [publicCardNumber, setPublicCardNumberState] = useState("#### #### #### ####");
    const [publicCardName, setPublicCardNameState] = useState("John Doe");
    const [publicRut, setPublicRutState] = useState("12.345.678-9");
    const [publicMonth, setPublicMonthState] = useState("00");
    const [publicYear, setPublicYearState] = useState("00");
    const [publicCvv, setPublicCvvState] = useState("⁕⁕⁕");
    const [publicProvider, setPublicProviderState] = useState("");

    // Memoize setters to prevent unnecessary re-renders
    const setPublicCardNumber = useCallback((value: string) => {
        setPublicCardNumberState(value);
    }, []);

    const setPublicCardName = useCallback((value: string) => {
        setPublicCardNameState(value);
    }, []);

    const setPublicRut = useCallback((value: string) => {
        setPublicRutState(value);
    }, []);

    const setPublicMonth = useCallback((value: string) => {
        setPublicMonthState(value);
    }, []);

    const setPublicYear = useCallback((value: string) => {
        setPublicYearState(value);
    }, []);

    const setPublicCvv = useCallback((value: string) => {
        setPublicCvvState(value);
    }, []);

    const setPublicProvider = useCallback((value: string) => {
        setPublicProviderState(value);
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        publicCardNumber,
        setPublicCardNumber,
        publicCardName,
        setPublicCardName,
        publicRut,
        setPublicRut,
        publicMonth,
        setPublicMonth,
        publicYear,
        setPublicYear,
        publicCvv,
        setPublicCvv,
        publicProvider,
        setPublicProvider
    }), [
        publicCardNumber,
        setPublicCardNumber,
        publicCardName,
        setPublicCardName,
        publicRut,
        setPublicRut,
        publicMonth,
        setPublicMonth,
        publicYear,
        setPublicYear,
        publicCvv,
        setPublicCvv,
        publicProvider,
        setPublicProvider
    ]);

    return (
        <CardContext.Provider value={contextValue}>
            {children}
        </CardContext.Provider>
    );
};