"use client"
import { useEffect } from "react";
import { setSession } from "@/app/actions";

export default function resetCallback() {
    useEffect(() => {
        async function session() {
                const hash = window.location.hash;
                if (!hash) return;

                const params = new URLSearchParams(hash.substring(1));
                const accessToken = params.get("access_token");
                const refreshToken = params.get("refresh_token");

                if (accessToken && refreshToken) {

                await setSession(accessToken, refreshToken).then((res) => {
                    if (res.status === 200) {
                        window.location.href = "/update-password";
                    } else {
                        window.location.href = "/login";
                    }
                });
            }
        }

        session();

    }, []);

    return <div>loginCallback</div>;
}