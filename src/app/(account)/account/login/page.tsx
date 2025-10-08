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

export default async function Login({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const returnUrl = Array.isArray(searchParams.return_url) ? searchParams.return_url[0] : searchParams.return_url || '/';

  return (
    <Styles.Container>
      <Alert />
      <Styles.Content
        queries={[
          { break: 450, css: "height: 60dvh;" }
        ]}
      >
        <Styles.LeftSide>
          <Styles.LeftContent>
            <Styles.LogoContent>
              <Image src="/logo.png" alt="Logo" width={220} height={70} />
            </Styles.LogoContent>   
            <Styles.TextH1>Iniciar sesión</Styles.TextH1>
            <ButtonGoogleLogin returnUrl={returnUrl} />
            <Styles.Divider>O</Styles.Divider>
            <FormLogin returnUrl={returnUrl}/>
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer 
          height="650px"
          queries={[
            { break: 1400, css: "height: 500px;" },
            { break: 1050, css: "display: none;" }
          ]}
        >
          <img
            src="/persona.webp"
            alt="Persona con planta"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
