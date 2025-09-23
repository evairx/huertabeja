"use client";
import { usePathname } from "next/navigation";
import MenuHome from "@/components/menus/menu-home";
import Cart from "@/components/menus/cart";

export function UseMenu() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  return (
    <>
      {isLoginPage ? null : (
        <>
          <MenuHome />   
          <Cart />
        </>
      )}
    </>
  )
}