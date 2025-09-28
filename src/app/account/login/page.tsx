import * as Styles from "@/styles/pages/login-style";
import Image from "next/image";
import ButtonGoogleLogin from "./button-google-login";
import FormLogin from "./form-login";
import { Alert } from "@/components/common/Alert";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Iniciar sesión - Huertabeja',
  description: 'Inicia sesión en Huertabeja para gestionar tus plantas y recibir consejos personalizados de cuidado.',
}

export default async function Login() {
  return (
    <Styles.Container>
      <Alert />
      <Styles.Content>
        <Styles.LeftSide>
          <Styles.LeftContent>
            <Styles.LogoContent>
              <Image src="/logo.png" alt="Logo" width={220} height={70} />
            </Styles.LogoContent>   
            <Styles.TextH1>Iniciar sesión</Styles.TextH1>
            <ButtonGoogleLogin />
            <Styles.Divider>O</Styles.Divider>
            <FormLogin/>
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer height="650px">
          <img
            src="/persona.webp"
            alt="Persona con planta"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
