"use client"
import Link from "next/link"
import * as Styles from "@/styles/menu-home-style"
import { getReturnUrl } from "@/utils/get-return-url";

export default function ButtonLogin() {
    const { url } = getReturnUrl();

    return (
        <Link href={url}>
            <Styles.TextLogin>Acceder</Styles.TextLogin>
        </Link>
    )
}