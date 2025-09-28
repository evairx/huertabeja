"use client"
import { useEffect } from "react";
import { setSession } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function resetCallback() {
    const router = useRouter();

    useEffect(() => {
        async function session() {
            const hash = window.location.hash;
            if (!hash) return;

            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");
            const at_expires_at = params.get("expires_at") ? parseInt(params.get("expires_at") as string) : 0;

            if (accessToken && refreshToken) {
                await setSession(accessToken, refreshToken, at_expires_at).then((res) => {
                    if (res.status === 200) {
                        router.push("/update-password");
                    } else {
                        router.push("/login");
                    }
                });
            }
        }

        session();
    }, []);

    return <div>loginCallback</div>;
}