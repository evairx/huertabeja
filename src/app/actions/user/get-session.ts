'use server'
import { getSupabaseClient } from "@/libs/supabase"
import { cookies } from "next/headers";

export async function getSession() {
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

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return { status: 400, body: { error: error.message } }
    }

    const { data: sessionData, error: sessionError } = await supabase
      .from("users").select("*")
      .eq("id", user?.id)
      .single();

    if (sessionError) {
        return { status: 400, body: { error: sessionError.message } }
    }

    const { data: role, error: rolError } = await supabase
      .from("roles").select("*")
      .eq("id", sessionData.rol_id)
      .single();

    const rol = {
      name: role.rol,
      perms: role.permissions
    }

    return { status: 200, body: { data: sessionData, rol } };
}
