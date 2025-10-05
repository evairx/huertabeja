"use client"
import { usePathname } from 'next/navigation';

export function getReturnUrl() {
    const pathname = usePathname();
    const base = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_URL_BASE;

    const url = `${base}/account/login?return_url=${encodeURIComponent(base + pathname)}`;
    const path = pathname;

    return { url, path };
}