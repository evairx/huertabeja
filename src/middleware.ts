import { defineMiddleware } from "astro/middleware";
import { getSupabaseClient } from "./lib/supabase";

function generateCartId() {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)

    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

function cartMiddleware({ cookies }: { cookies: any }) {
    const cart = cookies.get("cart");
    if (cart?.value) return;

    cookies.set("cart", generateCartId(), {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
    });
}

function authMiddleware({ cookies, url }: { cookies: any, url: any }) {
    const refresh_token = cookies.get("rid")?.value;

    const authPages = ['/account/login', '/account/register', '/account/forgot-password'];

    if (refresh_token && authPages.includes(url)) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/account",
            },
        });
    }
}

async function tokenRefresher({ cookies }: { cookies: any }) {
    const access_token = cookies.get("sid")?.value;
    const refresh_token = cookies.get("rid")?.value;

    if (access_token || !refresh_token) return;

    try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.refreshSession({ refresh_token });

        if (error || !data?.session) {
            cookies.delete("sid", { path: "/" });
            cookies.delete("rid", { path: "/" });
            return;
        }

        const { session } = data;

        const now = Math.floor(Date.now() / 1000);
        const expiresAt = session.expires_at ?? now + 3600;
        const maxAge = expiresAt - now;

        cookies.set("sid", session.access_token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge,
        });

        cookies.set("rid", session.refresh_token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

    } catch (err) {
        console.error("Refresh Error:", err);
        cookies.delete("sid", { path: "/" });
        cookies.delete("rid", { path: "/" });
    }
}

export const onRequest = defineMiddleware(async ({ url, cookies }, next) => {
    cartMiddleware({ cookies });
    await tokenRefresher({ cookies });
    const auth = authMiddleware({ cookies, url: url.pathname });
    if (auth) return auth;
    return next();
});