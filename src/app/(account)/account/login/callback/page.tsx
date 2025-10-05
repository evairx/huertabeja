"use client"
import { useEffect, Suspense } from "react";
import { setSession } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";

function LoginCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('return_url') || '/';

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
                        router.push(returnUrl);
                    } else {
                        router.push("/account/login");
                    }
                });
            }
        }

        session();
    }, []);

    return <div>loginCallback</div>;
}

export default function LoginCallback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginCallbackContent />
        </Suspense>
    );
}