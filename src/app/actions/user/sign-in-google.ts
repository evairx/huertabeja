'use server'
import { getSupabaseClient } from "@/libs/supabase"

export async function signInGoogle({ returnUrl} : {returnUrl: string}) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `http://localhost:3000/account/login/callback?return_url=${encodeURIComponent(returnUrl)}`,
        },
    });

    if (error) {
        console.log('Error al iniciar sesión con Google:', error.message);
        return { status: 500, body: { error: error.message } };
    }

    return { status: 200, body: { data } };
}