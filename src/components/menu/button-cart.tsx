"use client"
import * as Styles from "@/styles/menu-home-style"
import { CartContext } from "@/context/cart-context"
import { useContext } from "react"
import ShoppingCartIcon from "@/utils/icons/shopping-cart"

export function ButtonCart() {
    const { open, setOpen } = useContext(CartContext)

    let counter = 2;

    const handleClickCart = () => {
        setOpen(!open)
    }

    return (
        <Styles.IconContainer onClick={handleClickCart}>
            {counter > 0 && (
                <Styles.CounterCart>{counter}</Styles.CounterCart>
            )}
            <ShoppingCartIcon />
        </Styles.IconContainer>
    )
}