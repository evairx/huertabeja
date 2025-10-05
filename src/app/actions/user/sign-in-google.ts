'use server'
import { getSupabaseClient } from "@/libs/supabase"

export async function signInGoogle({ returnUrl }:{ returnUrl: string }) {
    const supabase = getSupabaseClient();

    const url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_URL_BASE;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${url}/account/login/callback?return_url=${encodeURIComponent(returnUrl)}`,
        },
    });

    if (error) {
        console.log('Error al iniciar sesión con Google:', error.message);
        return { status: 500, body: { error: error.message } };
    }

    return { status: 200, body: { data } };
}