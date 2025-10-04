"use client"
import * as Styles from "@/styles/menu-home-style"
import { CartContext } from "@/context/cart-context"
import { useContext } from "react"
import ShoppingCartIcon from "@/utils/icons/shopping-cart"

export function ButtonCart() {
    const { open, setOpen, cart } = useContext(CartContext)

    const handleClickCart = () => {
        setOpen(!open)
    }

    return (
        <Styles.IconContainer onClick={handleClickCart}>
            {cart && cart?.data && 'total_quantity' in cart.data && cart.data.total_quantity > 0 && (
                <Styles.CounterCart>{cart.data.total_quantity}</Styles.CounterCart>
            )}
            <ShoppingCartIcon />
        </Styles.IconContainer>
    )
}