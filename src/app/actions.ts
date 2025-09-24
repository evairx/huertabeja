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

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
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

export async function sendResetPasswordEmnail(formData: FormData) {
    const supabase = getSupabaseClient();
    const email = formData.get("email") as string;

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password/callback", 
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: true };
}

export async function updatePassword(formData: FormData) {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("access_token")?.value || null;
    const refresh_token = cookieStore.get("refresh_token")?.value || null;

    if (!access_token || !refresh_token) {
        return { status: 400, body: { error: "No autenticado" } }
    }

    const password = formData.get("password") as string;

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { data, error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: { data } };
}