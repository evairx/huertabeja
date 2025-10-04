'use server'
import { getSupabaseClient } from "@/libs/supabase"

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