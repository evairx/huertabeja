"use client"
import * as Styles from "@/styles/pages/login-style";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInGoogle } from "@/app/actions";

import GoogleSvg from "@/utils/icons/google-svg";

export default function ButtonGoogleLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        if (loading) return;
        setLoading(!loading);
        
        const data = await signInGoogle();

        if(data.status == 200 && data.body?.data?.url) {
            router.push(data.body.data.url);
        }
    }

    return (
        <Styles.ProviderButton onClick={handleClick} Loading={loading}>
            <GoogleSvg />
            Continuar con google
            {loading && <Styles.Loading />}
        </Styles.ProviderButton>
    )
}