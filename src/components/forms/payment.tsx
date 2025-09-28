"use client"
import * as Styles from "@/styles/payment-style"
import { useState, useRef, useContext } from "react"
import { CardContext } from "@/context/card-context"

export default function Payment() {
    const [rut, setRut] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const { setPublicCardNumber, setPublicCardName, setPublicRut, setPublicMonth, setPublicYear, setPublicCvv, setPublicProvider } = useContext(CardContext)
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [cvv, setCvv] = useState("")

    const yearInputRef = useRef<HTMLInputElement>(null)
    const cvvInputRef = useRef<HTMLInputElement>(null)

    const formatRut = (value: string) => {
        let numbers = value.replace(/[^0-9kK]/g, "")

        if (numbers.length > 9) {
            numbers = numbers.slice(0, 9)
        }

        if (numbers.length > 0) {
            let formatted = numbers

            if (formatted.length > 1) {
                const lastChar = formatted.slice(-1).toUpperCase()
                formatted = formatted.slice(0, -1) + "-" + lastChar
            }

            if (formatted.length > 4) {
                let start = formatted.indexOf("-") > -1
                    ? formatted.slice(0, -2)
                    : formatted
                formatted = start.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
                    formatted.slice(formatted.indexOf("-") > -1 ? -2 : formatted.length)
            }
            return formatted
        }
        return numbers
    }

    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "")

        if (numbers.length > 16) {
            return numbers.slice(0, 16)
        }

        const parts = numbers.match(/.{1,4}/g)
        return parts ? parts.join(" ") : numbers
    }

    const formatPublicCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        const parts = numbers.match(/.{1,4}/g) || [];

        return parts
            .map((part, index) =>
                index === 0 ? part : "⁕".repeat(part.length)
            )
            .join(" ");
    };

    const formatMonth = (value: string) => {
        const numbers = value.replace(/\D/g, "")
        if (numbers.length === 0) return ""

        const monthNum = parseInt(numbers)

        if (numbers.length === 1) {
            if (monthNum > 1) {
                if (yearInputRef.current) {
                    yearInputRef.current.focus()
                }
                return `0${monthNum}`
            }
            return numbers
        }

        if (numbers.length >= 2) {
            const twoDigitMonth = parseInt(numbers.slice(0, 2))

            if (twoDigitMonth > 12) {
                if (yearInputRef.current) {
                    yearInputRef.current.focus()
                }
                return "12"
            }

            if (numbers.length > 2) {
                if (yearInputRef.current) {
                    yearInputRef.current.focus()
                    setYear(numbers.slice(2))
                }
            } else {
                if (yearInputRef.current) {
                    yearInputRef.current.focus()
                }
            }

            return numbers.slice(0, 2)
        }

        return numbers
    }

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const cleaned = value.replace(/[^0-9kK]/g, "")
        setRut(formatRut(cleaned))
        setPublicRut(formatRut(cleaned))
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setCardNumber(formatCardNumber(value))
        setPublicCardNumber(formatPublicCardNumber(value))
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMonth(formatMonth(value))
        setPublicMonth(formatMonth(value))
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")

        if (value.length > 2) {
            if (cvvInputRef.current) {
                setYear(value.slice(0, 2))
                setPublicYear(value.slice(0, 2))
                cvvInputRef.current.focus()
                setCvv(value.slice(2, 6))
                setPublicCvv(value.slice(2, 6))
            }
        } else {
            setYear(value)
            setPublicYear(value)
        }
    }
    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "")
        setCvv(value.slice(0, 4))
        setPublicCvv("⁕".repeat(value.length));
    }

    return (
        <Styles.Container>
            <Styles.Title>Detalles del pago</Styles.Title>
            <Styles.InputContent>
                <Styles.Label>titular de la tarjeta</Styles.Label>
                <Styles.InputContents>
                    <Styles.Input
                        type="text"
                    />
                    <Styles.IconUser />
                </Styles.InputContents>

                <Styles.Label>R.U.T</Styles.Label>
                <Styles.InputContents>
                    <Styles.Input
                        value={rut}
                        onChange={handleRutChange}
                        active={rut.length > 0}
                    />
                    <Styles.IconRut active={rut.length > 0} />
                </Styles.InputContents>

                <Styles.Label>numero de la tarjeta</Styles.Label>
                <Styles.InputContents>
                    <Styles.Input
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        active={cardNumber.length > 0}
                    />
                    <Styles.IconCard active={cardNumber.length > 0} />
                </Styles.InputContents>

                <Styles.InputsContent>
                    <div>
                        <Styles.Label>mes</Styles.Label>
                        <Styles.InputContents>
                            <Styles.Input
                                value={month}
                                onChange={handleMonthChange}
                                maxLength={2}
                                active={month.length > 0}
                            />
                            <Styles.IconDate active={month.length > 0} />
                        </Styles.InputContents>
                    </div>
                    <div>
                        <Styles.Label>año</Styles.Label>
                        <Styles.InputContents>
                            <Styles.Input
                                ref={yearInputRef}
                                value={year}
                                onChange={handleYearChange}
                                maxLength={2}
                                active={year.length > 0}
                            />
                            <Styles.IconDate active={year.length > 0} />
                        </Styles.InputContents>
                    </div>
                    <div>
                        <Styles.Label>cvv</Styles.Label>
                        <Styles.InputContents>
                            <Styles.Input
                                ref={cvvInputRef}
                                value={cvv}
                                onChange={handleCvvChange}
                                maxLength={4}
                                type="password"
                                active={cvv.length > 0}
                            />
                            <Styles.IconCvv active={cvv.length > 0} />
                        </Styles.InputContents>
                    </div>
                </Styles.InputsContent>

                <Styles.PriceContent>
                    <Styles.PriceText>total a pagar:</Styles.PriceText>
                    <Styles.PriceAmount>$59.900</Styles.PriceAmount>
                </Styles.PriceContent>

                <Styles.ButtonPay>REALIZAR EL PAGO</Styles.ButtonPay>
            </Styles.InputContent>
        </Styles.Container>
    )
}