"use client"
import Link from "next/link"
import * as Styles from "@/styles/menu-home-style"
import { usePathname } from 'next/navigation';

export default function ButtonLogin() {
    const pathname = usePathname();
    const base = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : process.env.NEXT_PUBLIC_URL_BASE;

    const url = `${base}/account/login?return_url=${encodeURIComponent(base + pathname)}`;

    return (
        <Link href={url}>
            <Styles.TextLogin>Acceder</Styles.TextLogin>
        </Link>
    )
}