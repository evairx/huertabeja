'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function updatePassword(formData: FormData) {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("sid")?.value || null;
    const refresh_token = cookieStore.get("rid")?.value || null;

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