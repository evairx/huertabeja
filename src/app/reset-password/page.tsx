import * as Styles from "@/styles/pages/login-style";
import Image from "next/image";
import { Alert } from "@/components/common/Alert";
import FormReset from "./form-reset";

export default async function ResetPassword() {
  return (
    <Styles.Container>
      <Alert />
      <Styles.Content>
        <Styles.LeftSide>
          <Styles.LeftContent width="455px">
            <Styles.LogoContent>
              <Image src="/logo.png" alt="Logo" width={220} height={70} />
            </Styles.LogoContent>   
            <Styles.TextH1>Reiniciar contraseña</Styles.TextH1>
            <p>Se enviará un correo para reiniciar tu contraseña a tu dirección de email.</p>
            <FormReset/>
          </Styles.LeftContent>
        </Styles.LeftSide>
        <Styles.ImageContainer>
          <img
            src="/persona.webp"
            alt="Persona con planta"
          />
        </Styles.ImageContainer>
      </Styles.Content>
    </Styles.Container>
  );
}
