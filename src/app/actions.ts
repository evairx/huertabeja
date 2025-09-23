'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function signInGoogle() {
    const supabase = getSupabaseClient();
     const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "http://localhost:3000/login/callback",
        },
    });

    if (error) {
        console.log('Error al iniciar sesión con Google:', error.message);
        return { status: 500, body: { error: error.message } };
    }

    return { status: 200, body: { data } };
}

export async function setSession(access_token: string, refresh_token: string) {
    if (!access_token || !refresh_token) return { status: 500 };
    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });

    cookieStore.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    return { status: 200 };
}