import { cookies } from "next/headers";
import { getSupabaseClient } from "@/libs/supabase";
import ClientRefresher from "@/components/client/ClientRefresher";
import { redirect } from "next/navigation"

export default async function EmailText() {
    const cookiesStore = await cookies();
    const access_token = cookiesStore.get("access_token")?.value;
    const refresh_token = cookiesStore.get("refresh_token")?.value;

    if (!access_token) {
        return (
            <ClientRefresher>
                cargando...
            </ClientRefresher>
        );
    }

    if (!refresh_token) {
        redirect('/account/login');
    }

    const supabase = getSupabaseClient();

    await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return "User not found";
    }

    const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        userData?.email
    )
}