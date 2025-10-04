'use server'
import { cookies } from "next/headers";

export async function setSession(access_token: string, refresh_token: string, at_expires_at: number) {
    if (!access_token || !refresh_token) return { status: 500 };
    const cookieStore = await cookies();

    const now = Math.floor(Date.now() / 1000);
    const maxAge = at_expires_at - now;

    cookieStore.set("sid", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge
    });

    cookieStore.set("rid", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    return { status: 200 };
}
