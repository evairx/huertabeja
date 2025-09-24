"use client"
import * as Styles from "@/styles/menu-home-style"
import Image from "next/image"
import Link from "next/link"
import ShoppingCartIcon from "@/utils/icons/shopping-cart"
import { CartContext } from "../../context/cart-context"
import { useContext } from "react"

export default function MenuHome() {
    const { open, setOpen} = useContext(CartContext)
    console.log(open)

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
                <Link href="/login">
                    <Styles.TextLogin>Acceder</Styles.TextLogin>
                </Link>
                <Styles.BorderSeparator />
                <Styles.IconContainer onClick={() => setOpen(!open)}>
                    <ShoppingCartIcon/>
                </Styles.IconContainer>
            </Styles.UlRight>
        </Styles.Menu>
    )
}