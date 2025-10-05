"use client";
import { createContext, PropsWithChildren, useState, useEffect, useCallback } from "react";
import { getCart, removeProductCart } from "@/app/actions";

interface CartContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  cart: Awaited<ReturnType<typeof getCart>> | null;
  loadingCart: boolean;
  removeItemFromCart: (itemId: string) => Promise<void>;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  slug: string;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  total_quantity: number;
  currency: string;
}


export const CartContext = createContext<CartContextType>({ open: false, setOpen: () => { }, cart: null, loadingCart: true, removeItemFromCart: async () => { } });

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  const [cart, setCart] = useState<Awaited<ReturnType<typeof getCart>> | null>(null);

  useEffect(() => {
    async function fetchCart() {
      const result = await getCart();

      if (result.status === 404) {
        setLoadingCart(false);
        return;
      }

      setCart(result);
      console.log("Cart updated:", result);
    }

    fetchCart();
  }, []);

  const removeItemFromCart = useCallback(async (itemId: string) => {
    try {
      const result = await removeProductCart(itemId);

      if (!result || result.status !== 200) {
        console.warn("Error removing item from cart:", result);
        return;
      }

      setCart((prevCart) => {
        if (!prevCart || !('data' in prevCart)) return prevCart;

        const prevData = prevCart.data as CartResponse;
        const updatedItems = prevData.items.filter((item) => item.id !== itemId);

        const subtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total_quantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const taxRate = prevData.subtotal > 0 ? prevData.tax / prevData.subtotal : 0;
        const tax = Math.round(subtotal * taxRate);
        const total = subtotal + tax;

        return {
          ...prevCart,
          data: {
            ...prevData,
            items: updatedItems,
            subtotal,
            tax,
            total,
            total_quantity,
          },
        };
      });
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  }, []);

  return (
    <CartContext.Provider value={{ open, setOpen, cart, loadingCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
