"use client"
import * as Styles from "@/styles/pages/login-style";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { signInGoogle } from "@/app/actions";
import { AlertContext } from "@/context/alert-context";

import GoogleSvg from "@/utils/icons/google-svg";

export default function ButtonGoogleLogin() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showAlert } = useContext(AlertContext);

    const handleGoogleClick = async () => {
        if (loading) return;
        setLoading(!loading);
        
        const data = await signInGoogle();

        if(data.status == 200 && data.body?.data?.url) {
            router.push(data.body.data.url);
        } else if(data.status == 500) {
            showAlert("Hubo un error al iniciar sesión con Google");
        }
    }

    return (
        <Styles.ProviderButton onClick={handleGoogleClick} Loading={loading}>
            <GoogleSvg />
            Continuar con google
            {loading && <Styles.Loading color={"#000000"} />}
        </Styles.ProviderButton>
    )
}