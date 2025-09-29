"use client"
import * as Styles from "@/styles/menu-home-style"
import Image from "next/image"
import Link from "next/link"
import ShoppingCartIcon from "@/utils/icons/shopping-cart"
import { CartContext } from "../../context/cart-context"
import { useContext } from "react"
import ButtonLogin from "./button-login."

export default function MenuHome() {
    const { open, setOpen } = useContext(CartContext)

    let counter = 2;

    return (
        <Styles.Menu>
            <div>
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={240} height={70} />
                </Link>
            </div>
            <ul>
                <li>Inicio</li>
                <li>Sobre Nosotros</li>
            </ul>
            <Styles.UlRight>
                <ButtonLogin />
                <Styles.BorderSeparator />
                <Styles.IconContainer onClick={() => setOpen(!open)}>
                    {counter > 0 && (
                        <Styles.CounterCart>{counter}</Styles.CounterCart>
                    )}
                    <ShoppingCartIcon />
                </Styles.IconContainer>
            </Styles.UlRight>
        </Styles.Menu>
    )
}