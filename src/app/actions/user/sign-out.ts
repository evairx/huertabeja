"use server"
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function signOut() {
    const cookieStore = await cookies();

    const access_token = cookieStore.get("sid")?.value || null;
    const refresh_token = cookieStore.get("rid")?.value || null;

    if (!access_token || !refresh_token) {
        return { status: 400, body: { error: "No autenticado" } }
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    cookieStore.delete("sid");
    cookieStore.delete("rid");

    return { status: 200 };
}