"use client"
import * as Styles from "@/styles/menu-home-style"
import Image from "next/image"
import Link from "next/link"
import ShoppingCartIcon from "@/utils/icons/shopping-cart"
import { CartContext } from "../../context/cart-context"
import { useContext, useEffect, useState } from "react"
import { getSession } from "@/app/actions"


export default function MenuHome() {
    const { open, setOpen } = useContext(CartContext)
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    console.log(open)

    useEffect(() => {
        async function fetchData() {
            const res = await getSession()
            if (res?.status === 200) {
                setUser(res?.body?.data)
            }
            setLoading(false);
        }
        fetchData()
    }, [])

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
                {loading ? (
                    <Styles.AvatarLoading />
                ) : (
                    user ? (
                        <div>
                            <Image src={user.avatar} alt={user.name} width={40} height={40} style={{ borderRadius: '999px', marginTop: '8px'}}/>
                        </div>
                    ) : (
                        <Link href="/account/login">
                            <Styles.TextLogin>Acceder</Styles.TextLogin>
                        </Link>
                    )
                )}
                <Styles.BorderSeparator />
                <Styles.IconContainer onClick={() => setOpen(!open)}>
                    <ShoppingCartIcon />
                </Styles.IconContainer>
            </Styles.UlRight>
        </Styles.Menu>
    )
}