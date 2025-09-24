"use client";
import { useContext, useRef } from "react";
import { CartContext } from "@/context/cart-context";
import { useClickOutside } from "@/hook/useClickOutside";
import * as Styles from "@/styles/cart-style";

export default function Cart() {
  const { open, setOpen } = useContext(CartContext);
  const cartRef = useRef<HTMLDivElement>(null!);

  useClickOutside(cartRef, () => setOpen(false), open);
  
  return (
    <>
        <Styles.Overlay open={open} />
        <Styles.CartContainer ref={cartRef} open={open}>
            Cart
        </Styles.CartContainer>
    </>
  );
}