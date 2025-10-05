"use client";
import { useContext, useRef } from "react";
import { CartContext } from "@/context/cart-context";
import { useClickOutside } from "@/hook/useClickOutside";
import * as Styles from "@/styles/cart-style";

export default function Cart() {
  const { open, setOpen, cart, removeItemFromCart } = useContext(CartContext);
  const cartRef = useRef<HTMLDivElement>(null!);

  useClickOutside(cartRef, () => setOpen(false), open);
  
  return (
    <>
        <Styles.Overlay open={open} />
        <Styles.CartContainer ref={cartRef} open={open}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Styles.CartTitle>Mi carrito</Styles.CartTitle>
                <Styles.CloseButton onClick={() => setOpen(false)}>Cerrar</Styles.CloseButton>
            </div>
            <Styles.BorderLine />
            <Styles.CountInfo>
                {cart && 'total_quantity' in cart.data && (
                    <Styles.CountText>{cart.data.total_quantity} {cart.data.total_quantity === 1 ? 'artículo' : 'artículos'} en la bolsa</Styles.CountText>
                )}
            </Styles.CountInfo>
            <Styles.BorderLine />
            <Styles.CartContent>
                {cart?.status === 200 && 'items' in cart.data && cart.data.items.length ? (
                    cart.data.items.map((item) => (
                        <Styles.CartItem key={item.id}>
                            <Styles.CartItemImage src={item.image} alt={item.name} />
                            <div>
                                <Styles.CartItemTitle>{item.name}</Styles.CartItemTitle>
                                <Styles.CartItemQuantity>Cantidad: {item.quantity}</Styles.CartItemQuantity>
                                <button onClick={() => removeItemFromCart(item.id)}>Eliminar</button>
                            </div>
                        </Styles.CartItem>
                    ))
                ) : (
                    <p>No hay productos en el carrito</p>
                )}
            </Styles.CartContent>
            <Styles.BorderLine />
        </Styles.CartContainer>
    </>
  );
}