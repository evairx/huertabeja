import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/libs/supabase";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("refresh_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "No refresh token provided" }, { status: 400 });
        }

        const supabase = getSupabaseClient();

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: token,
        });

        if (error || !data?.session) {
            return NextResponse.json({ error: "Failed to refresh session" }, { status: 401 });
        }

        const { access_token, refresh_token, expires_at } = data.session;

        if (typeof expires_at !== "number") {
            return NextResponse.json({ error: "Session expiration time is missing" }, { status: 500 });
        }

        const response = NextResponse.json({ access_token, refresh_token, expires_at });

        return response;
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
