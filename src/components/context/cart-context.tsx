"use client";
import { createContext, PropsWithChildren, useState } from "react";

interface CartContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CartContext = createContext<CartContextType>({ open: false, setOpen: () => {} });

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  return (
    <CartContext.Provider value={{ open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};
