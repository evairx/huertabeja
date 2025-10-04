'use server'
import { getSupabaseClient } from "@/libs/supabase"

export async function sendResetPasswordEmail(formData: FormData) {
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