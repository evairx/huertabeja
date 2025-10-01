import * as Styles from "@/styles/menu-home-style"
import Link from "next/link"
import ButtonLogin from "./button-login."
import { ButtonCart } from "./button-cart"
import { cookies } from "next/headers"

export default async function MenuHome() {
    const cookiesStore = await cookies()
    const refresh = cookiesStore.get("refresh_token")?.value

    return (
        <Styles.Menu>
            <div>
                <Link href="/">
                    <img src="/logo.png" alt="Logo" width={240} height={70} />
                </Link>
            </div>
            <Styles.Ulcenter>
                <li>Inicio</li>
                <li>Sobre Nosotros</li>
            </Styles.Ulcenter>
            <Styles.UlRight>
                {refresh ? (
                    <ButtonLogin / >
                ) : (
                    <Link href="/account/login">
                        <Styles.TextLogin>Acceder</Styles.TextLogin>
                    </Link>
                )}
                <Styles.BorderSeparator / >
                <ButtonCart / >
            </Styles.UlRight>
        </Styles.Menu>
    )
}
