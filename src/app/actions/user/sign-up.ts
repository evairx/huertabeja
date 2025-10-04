'use server'
import { getSupabaseClient } from "@/libs/supabase"

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
        return { status: 400, body: { error: "El nombre es requerido" } }
    }

    if (!email) {
        return { status: 400, body: { error: "El email es requerido" } }
    }

    if (!password) {
        return { status: 400, body: { error: "La contraseña es requerida" } }
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name || '',
            }
        }
    });

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    return { status: 200, body: { message: "Usuario creado exitosamente" } };
}
